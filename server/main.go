package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
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
	//DIGITALASSETS const
	DIGITALASSETS = "DIGITAL_ASSETS"
)

//Constants type
type Constants struct {
	Db                      string
	Port                    string
	Host                    string
	MongoURI                string
	UsersCollection         string
	DigitalAssetsCollection string
}

//Set method
func (c *Constants) Set(port, host, mongoURI, db, users, digitalAssets string) error {
	c.Host = host
	c.Port = port
	c.Db = db
	c.MongoURI = mongoURI
	c.UsersCollection = users
	c.DigitalAssetsCollection = digitalAssets
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
func Mongo(users, digitalAssets *mongo.Collection) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set(USERS, users)
		c.Set(DIGITALASSETS, digitalAssets)
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
		c.String(http.StatusOK, "healthy")
	}
}

//Server method
func main() {
	// Load env varaiables into context
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file, using global environment variables")
	}

	//Read the env variables
	port := os.Getenv(PORT)
	host := os.Getenv(HOST)
	db := os.Getenv(DB)
	mongoURI := os.Getenv(MONGOURI)
	users := os.Getenv(USERS)
	digitalAssets := os.Getenv(DIGITALASSETS)

	var conts Constants
	//Set all the constants from env
	if err := conts.Set(port, host, mongoURI, db, users, digitalAssets); err != nil {
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
	//Declare handle to collections
	usersCollection := client.Database(conts.Db).Collection(conts.UsersCollection)
	digitalAssetsCollection := client.Database(conts.Db).Collection(conts.DigitalAssetsCollection)
	// *ROUTER*
	// Creates a router without any middleware by default
	router := gin.New()
	// Use Logger middleware
	router.Use(gin.Logger())
	// Use Recovery middleware recovers from any panics and writes a 500 if there was one.
	router.Use(gin.Recovery())
	//Use our customer middlewares
	// Add options for CORS
	router.OPTIONS("/*cors", func(c *gin.Context) { /* Does nothing!*/ })
	router.Use([]gin.HandlerFunc{
		SetConstants(conts),
		CORS(),
		Mongo(usersCollection, digitalAssetsCollection),
	}...)
	// Add Health endpoint. Should return 200 when healthy
	router.GET("/health", Health())

	/*
	 ADD YOUR ENDPOINT HERE


	*/

	if err := router.Run(":" + conts.Port); err != nil {
		log.Fatal(err)
	}
}
