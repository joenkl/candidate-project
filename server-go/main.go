package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/crownsterlingllc/candidate-project/server-go/entities"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

//Constants
const (
	//PORT const
	PORT = "PORT"
	//HOST const
	HOST = "HOST"
	//DB const
	DB = "DB"
	//MONGOURI const
	MONGOURI = "MONGO_URI"
	//USERS const
	USERS = "USERS"
)

//Constants type
type Constants struct {
	Db              string
	Port            string
	Host            string
	MongoURI        string
	UsersCollection string
}

//Set method
func (c *Constants) Set(port, host, mongoURI, db, users string) error {
	c.Host = host
	c.Port = port
	c.Db = db
	c.MongoURI = mongoURI
	c.UsersCollection = users
	return nil
}

// CORS MIDDLEWARE sets up cors functionality for requests using this middleware
func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Max-Age", "0")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Cache-Control, Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Type, Content-Length")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Cache-Control", "private")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
		} else {
			c.Next()
		}
	}
}

//Mongo middleware to copy connection and add to context
func Mongo(users *mongo.Collection) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set(USERS, users)
		c.Next()
	}
}

//SetConstants middleware to add constants to context
func SetConstants(consts Constants) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set("constants", consts)
		c.Next()
	}
}

//Health endpoint
func Health() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.String(http.StatusOK, "OK")
	}
}

//CreateUser endpoint
func CreateUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		var user User
		usersCollection := c.MustGet(USERS).(*mongo.Collection) //Get mongo connection (set in Mongo middleware) from context
		err := c.BindJSON(&user)
		if err != nil { //If there is an error binding the payload to our user type abort with invalid payload message and status 400
			c.Abort()
			c.JSON(http.StatusBadRequest, entities.InvalidPayload)
			return
		}
		res, err := usersCollection.InsertOne(context.Background(), user)
		if err != nil { //If the insert fails, abort with db insert error message and status 400
			c.Abort()
			c.JSON(http.StatusBadRequest, entities.DbInsertError)
			return
		}
		c.JSON(http.StatusOK, res.InsertedID) //Return the inserted id and a 200 status
	}
}

//FindUser endpoint
func FindUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		var err error
		var id primitive.ObjectID
		var user User
		var userFound *mongo.SingleResult
		usersCollection := c.MustGet(USERS).(*mongo.Collection)
		if id, err = primitive.ObjectIDFromHex(c.Param("id")); err != nil {
			c.Abort()
			c.JSON(http.StatusBadRequest, entities.InvalidPayload)
			return
		}
		userFound = usersCollection.FindOne(context.Background(), bson.M{"_id": id})
		if userFound.Err() != nil { //If there are no users found or a database error, abort with not found error message and status 404
			c.Abort()
			c.JSON(http.StatusNotFound, entities.NotFound)
			return
		}
		userFound.Decode(&user)     //Decode the result onto the user
		c.JSON(http.StatusOK, user) //Return the user and a 200 status
	}
}

//User model
type User struct { //tags for parsing struct to either json and bson
	ID        primitive.ObjectID `json:"_id" bson:"_id"`
	CreatedAt string             `json:"createdAt" bson:"createdAt"`
	Email     string             `json:"email" bson:"email"`
	FirstName string             `json:"firstName" bson:"firstName"`
	LastName  string             `json:"lastName" bson:"lastName"`
	ZipCode   string             `json:"zipCode" bson:"zipCode"`
	City      string             `json:"city" bson:"city"`
	State     string             `json:"state" bson:"state"`
	Street    string             `json:"street" bson:"street"`
	Company   string             `json:"company" bson:"company"`
	Title     string             `json:"title" bson:"title"`
}

func main() {
	// Load env varaiables into context
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	//Read the env variables
	port := os.Getenv(PORT)
	host := os.Getenv(HOST)
	db := os.Getenv(DB)
	mongoURI := os.Getenv(MONGOURI)
	users := os.Getenv(USERS)

	var conts Constants
	//Set all the constants from env
	if err := conts.Set(port, host, mongoURI, db, users); err != nil {
		fmt.Println(err)
	}

	//Define the mongo client
	client, err := mongo.NewClient(options.Client().ApplyURI(conts.MongoURI))
	if err != nil {
		fmt.Println(err)
	}
	pingctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	//Connect to the database
	if err = client.Connect(pingctx); err != nil {
		log.Fatal(err)
	}
	//Ping the database for health check
	if err = client.Ping(pingctx, readpref.Primary()); err != nil {
		log.Fatal(err)
	}
	//Declare a handle to the users collection
	usersCollection := client.Database(conts.Db).Collection(conts.UsersCollection)

	// *ROUTER*
	// Creates a router without any middleware by default
	router := gin.New()

	//MIDDLEWARE
	// Add Logger middleware
	router.Use(gin.Logger())
	// Add Recovery middleware. This recovers from any panics and returns 500 if panic
	router.Use(gin.Recovery())
	// Add constanst to middleware
	router.Use(SetConstants(conts))
	// Add CORS to middleware
	router.Use(CORS())
	// Add Mongo to middleware
	router.Use(Mongo(usersCollection))

	//ENDPOINTS
	// Add options endpoint
	router.OPTIONS("/*cors", func(c *gin.Context) { /* Does nothing!*/ })
	// Add Health endpoint. Should return 200 when healthy
	router.GET("/health", Health())
	// Add Find user endpoint. Should return the user and status 200
	router.GET("/users/:id", FindUser())
	// Add Create user endpoint. Should create a user and return created user ID and status 200
	router.POST("/users", CreateUser())

	/*
	 * Create endpoints here
	 */

	if err := router.Run(":" + conts.Port); err != nil {
		log.Fatal(err)
	}
}
