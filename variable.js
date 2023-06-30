module.exports = {
    ID:111,
    PORT:33111,
    MAX_LENGTH:255,
    TYPE_VALUE:123,
    HTTP_STATUS: {
        'OK': 200,
        'CREATED': 201,
        'NO_CONTENT': 204,
        'BAD_REQUEST': 400,
        'NOT_FOUND': 404,
        'UNPROCESSABLE_ENTITY': 422,
      },
      HTTP_MESSAGES: {
        'OK': "OK",
        'CREATED': "Created",
        'NO_CONTENT': "No Content",
        'BAD_REQUEST': "Bad Request",
        'ERR_REQUIRED_FIELDS': "'name' and 'type' are required fields",
        'MAX_LENGH': "'name' field must be a string with a maximum of 255 characters",
        'MUST_BE_NUMBER': "Field 'type' must be a number",
        'NOT_FOUND': "Not Found",
        'UNPROCESSABLE_ENTITY': "Unprocessable Entity",
      },
    };

    
