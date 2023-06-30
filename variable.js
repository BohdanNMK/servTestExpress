module.exports = {
    ID:111,
    PORT:33111,
    MAX_LENGTH:255,
    TYPE_VALUE:123,
    HTTP_STATUS: {
        OK: 200,
        CREATED: 201,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        NOT_FOUND: 404,
        UNPROCESSABLE_ENTITY: 422,
      },
      HTTP_MESSAGES: {
        "OK": "OK",
        "201": "Created",
        "204": "No Content",
        "400": "Bad Request",
        "ERR_REQUIRED_FIELDS": "'name' and 'type' are required fields",
        "MAX_LENGH": "'name' field must be a string with a maximum of 255 characters",
        400.3: "Field 'type' must be a number",
        404: "Not Found",
        422: "Unprocessable Entity",
      },
    };

    
