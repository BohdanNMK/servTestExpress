module.exports = {
  PORT:33111,
  VALUE:
  { ID:111, 
    MAX_LENGTH:255,
    TYPE_VALUE:123,
    NAME_VALUE:'pest'
  },
    
      HTTP_MESSAGES: {
        'ERR400':{
          'BAD_REQUEST': "Bad Request",
          'ERR_REQUIRED_FIELDS': "'name' and 'type' are required fields",
          'ERR_REQUIRED_FIELDS_NAME':"'name' are required fields",
          'MAX_LENGH': "'name' field must be a string with a maximum of 255 characters"
        },
        'OK': "OK",
        'VARIABLE_UNDEFINED':'variable is undefined',
        'CREATED': "Created",
        'NO_CONTENT': "No Content",
        'MUST_BE_NUMBER': "Field 'type' must be a number",
        'NOT_FOUND': "Not Found",
        'UNPROCESSABLE_ENTITY': "Unprocessable Entity",
        'INTERNAL_SERVER_ERROR':"Internal Server Error"
      },
    };

    
