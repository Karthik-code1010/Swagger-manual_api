const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
var cors = require('cors');
app.use(cors());
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "Mathcur API",
      version: '1.0.0',
    },
    tags: [
      {
          "name": "Books",
          "description": "Endpoints"
      }
  ],
  servers: [
    {
      url: 'http://localhost:5000/',
      description: 'Local server'
    },
    {
      url: 'https://api_url_testing',
      description: 'Testing server'
    },
    {
      url: 'https://api_url_production',
      description: 'Production server'
    }
  ],
  components: {
    securitySchemes: {
      apiKey: {
        type: "apiKey",
        in: "header",
        name: "X-API-KEY"
      },
      appId: {
        type: "apiKey",
        in: "header",
        name: "X-APP-ID"
      }
    }
  },
  security: [
    {
      apiKey: [],
      appId: []
    }
  ],
  definitions: {
    Order2: {
      type: "object",
      properties: {
        id1: {
          type: "integer",
          format: "int64"
        },
        petId: {
          type: "integer",
          format: "int64"
        },
        quantity: {
          type: "integer",
          format: "int32"
        },
        shipDate: {
          type: "string",
          format: "date-time"
        },
        status: {
          type: "string",
          description: "Order Status",
          enum: [
            "placed",
            "approved",
            "delivered"
          ]
        },
        complete: {
          type: "boolean",
          default: false
        }
      },
      xml: {
        name: "Order"
      }
    },
    Category: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          format: "int64"
        },
        name: {
          type: "string"
        }
      },
      xml: {
        name: "Category"
      }
    },
    User: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          format: "int64"
        },
        username: {
          type: "string"
        },
        firstName: {
          type: "string"
        },
        lastName: {
          type: "string"
        },
        email: {
          type: "string"
        },
        password: {
          type: "string"
        },
        phone: {
          type: "string"
        },
        userStatus: {
          type: "integer",
          format: "int32",
          description: "User Status"
        }
      },
      xml: {
        name: "User"
      }
    },
    Tag: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          format: "int64"
        },
        name: {
          type: "string"
        }
      },
      xml: {
        name: "Tag"
      }
    },
    Pet: {
      type: "object",
      required: [
        "name",
        "photoUrls"
      ],
      properties: {
        id: {
          type: "integer",
          format: "int64"
        },
        category: {
          $ref: "#/definitions/Category"
        },
        name: {
          type: "string",
          example: "doggie"
        },
        photoUrls: {
          type: "array",
          xml: {
            name: "photoUrl",
            wrapped: true
          },
          items: {
            type: "string"
          }
        },
        tags: {
          type: "array",
          xml: {
            name: "tag",
            wrapped: true
          },
          items: {
            $ref: "#/definitions/Tag"
          }
        },
        status: {
          type: "string",
          description: "pet status in the store",
          enum: [
            "available",
            "pending",
            "sold"
          ]
        }
      },
      xml: {
        name: "Pet"
      }
    },
    ApiResponse: {
      type: "object",
      properties: {
        code: {
          type: "integer",
          format: "int32"
        },
        type: {
          type: "string"
        },
        message: {
          type: "string"
        }
      }
    }
  },
  },
  apis: ["app.js"],

  
};



const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));




/**
 * @swagger
 * /getjson:
 *   get:
 *     tags: 
 *      - 'Books' 
 *     description: Get all books
 *     summary: "Add a new books"
 *     produces:
 *      - "application/json" 
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: "Invalid ID supplied"
 *       404:
 *         description: "Bokks not found"
 * 
 */
app.get('/getjson', (req, res) => {
  res.status(200).send(swaggerDocs)
 
});
/**
 * @swagger
 * /books:
 *   get:
 *     tags: 
 *      - 'Books' 
 *     description: Get all books
 *     summary: "Add a new books"
 *     produces:
 *      - "application/json"
 *      - "application/xml"
 *      - "application/txt"  
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: "Invalid ID supplied"
 *       404:
 *         description: "Bokks not found"
 * 
 */
app.get('/books', (req, res) => {

  var apph = JSON.stringify(req.headers);
  console.log('karthik',JSON.stringify(req.headers));
  console.log(1);
  console.log(apph);
  var head= JSON.parse(apph);
  console.log(head);
  console.log(2);
  var api_key = head['x-api-key'];
  var appid = head['x-app-id']
  console.log(api_key)
  console.log(appid)
  if(api_key == 1234 && appid == 4321){
    res.status(200).send(swaggerDocs)
  }else{
    res.status(401).send({ auth: false, message: 'No id provided.' });
  }
 
});

/**
 * @swagger
 *  /books:
 *    post:
 *     tags:
 *     - "pet"
 *     summary: "Add a new pet to the store"
 *     description: ""
 *     operationId: "addPet"
 *     consumes:
 *     - "application/json"
 *     - "application/xml"
 *     - "application/txt"
 *     produces:
 *     - "application/xml"
 *     - "application/json"
 *     - "application/txt"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Pet object that needs to be added to the store"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/Pet"
 *     responses:
 *       "405":
 *         description: "Invalid input"
 *       "200":
 *         description: "success"
 *     security:
 *     - petstore_auth:
 *       - "write:pets"
 *       - "read:pets"
 */
app.post('/books', (req, res) => {
  res.status(201).send();
});




app.listen(5000, () => console.log("listening on 5000"));
