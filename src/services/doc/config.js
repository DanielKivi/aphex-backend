module.exports = {
  'swagger': '2.0',
  'info': {
    'version': '1.0.0',
    'title': 'Syro API'
  },
  'host': 'syro.dannykivi.com',
  'tags': [
    {
      'name': 'authentication',
      'description': 'Authentication using JWT'
    },
    {
      'name': 'sample',
      'description': 'Music Samples'
    },
    {
      'name': 'user',
      'description': 'Users of the application'
    }
  ],
  'schemes': [
    'https'
  ],
  'paths': {
    '/authentication': {
      'post': {
        'tags': [
          'authentication'
        ],
        'summary': 'Login to a user account',
        'description': 'Used to initialize authentication and return a JWT',
        'operationId': 'authorize',
        'consumes': [
          'application/json'
        ],
        'produces': [
          'application/json'
        ],
        'parameters': [
          {
            'in': 'body',
            'name': 'body',
            'description': 'The username and password to sign in with',
            'required': true,
            'schema': {
              'type': 'object',
              'properties': {
                'email': {
                  'type': 'string',
                  'example': 'user@user.com'
                },
                'password': {
                  'type': 'string',
                  'example': 'secret'
                }
              }
            }
          }
        ],
        'responses': {
          '201': {
            'description': 'Authentication Success',
            'schema': {
              'type': 'object',
              'properties': {
                'accessToken': {
                  'type': 'string',
                  'description': 'JWT Token'
                }
              }
            }
          },
          '401': {
            'description': 'Invalid Login'
          }
        }
      }
    },
    '/users': {
      'post': {
        'tags': [
          'user'
        ],
        'summary': 'Create a new user',
        'description': 'Used on registration to create a new user',
        'operationId': 'login',
        'consumes': [
          'application/json'
        ],
        'produces': [
          'application/json'
        ],
        'parameters': [
          {
            'in': 'body',
            'name': 'body',
            'description': 'The username and password to create a new user with',
            'required': true,
            'schema': {
              'type': 'object',
              'properties': {
                'email': {
                  'type': 'string',
                  'example': 'user@user.com'
                },
                'password': {
                  'type': 'string',
                  'example': 'secret'
                }
              }
            }
          }
        ],
        'responses': {
          '201': {
            'description': 'Successful Operation',
            'schema': {
              'type': 'object',
              'properties': {
                'email': {
                  'type': 'string'
                },
                'id': {
                  'type': 'string'
                }
              }
            }
          },
          '401': {
            'description': 'Invalid Login'
          }
        }
      }
    },
    '/sample': {
      'get': {
        'tags': [
          'sample'
        ],
        'summary': 'Get All Samples',
        'description': 'Returns a paginated response of Samples',
        'operationId': 'getSample',
        'produces': [
          'application/json'
        ],
        'parameters': [
          {
            'in': 'query',
            'name': '$limit',
            'type': 'integer',
            'description': 'Number of results to return (optional)'
          },
          {
            'in': 'query',
            'name': '$skip',
            'type': 'integer',
            'description': 'Number of results to skip (optional)'
          },
          {
            'in': 'query',
            'name': 'name',
            'type': 'integer',
            'description': 'Filter on name of the music sample. Will return any sample with a name containing the text'
          }
        ],
        'responses': {
          '200': {
            'description': 'Successful Operation',
            'schema': {
              'type': 'object',
              'properties': {
                'total': {
                  'type': 'integer',
                  'description': 'Total Number of Samples'
                },
                'limit': {
                  'type': 'integer',
                  'description': 'The maximum number of Samples returned in this data object'
                },
                'skip': {
                  'type': 'integer',
                  'description': 'How many Samples to skip'
                },
                'data': {
                  'type': 'array',
                  'description': 'An array of Samples',
                  'items': {
                    '$ref': '#/definitions/Sample'
                  }
                }
              }
            }
          },
          '401': {
            'description': 'Not Authorized'
          }
        },
        'security': [
          {
            'JWT': []
          }
        ]
      },
      'post': {
        'tags': [
          'sample'
        ],
        'summary': 'Create a New Sample',
        'description': 'Created a new Sample and returns it\'s object',
        'operationId': 'createSample',
        'produces': [
          'application/json'
        ],
        'parameters': [
          {
            'in': 'body',
            'name': 'body',
            'description': 'The name and Data URL of the Sample',
            'required': true,
            'schema': {
              'type': 'object',
              'properties': {
                'name': {
                  'type': 'string',
                  'example': 'Ice Cubes in Glass'
                },
                'uri': {
                  'type': 'string',
                  'example': 'data:audio/mp3;base64,//uQRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAA9AADiVg....'
                }
              }
            }
          }
        ],
        'responses': {
          '201': {
            'description': 'Successful Operation',
            'schema': {
              '$ref': '#/definitions/Sample'
            }
          },
          '401': {
            'description': 'Not Authorized'
          }
        },
        'security': [
          {
            'JWT': []
          }
        ]
      }
    },
    '/sample/{sampleId}': {
      'get': {
        'tags': [
          'sample'
        ],
        'summary': 'Get A Sample',
        'description': 'Gets a sample by a specific ID',
        'operationId': 'getSampleByID',
        'produces': [
          'application/json'
        ],
        'parameters': [
          {
            'name': 'sampleId',
            'in': 'path',
            'description': 'The ID of a sample',
            'required': true,
            'type': 'string'
          }
        ],
        'responses': {
          '200': {
            'description': 'Successful Operation',
            'schema': {
              '$ref': '#/definitions/Sample'
            }
          },
          '400': {
            'description': 'No Sample With ID Found'
          },
          '401': {
            'description': 'Not Authorized'
          }
        },
        'security': [
          {
            'JWT': []
          }
        ]
      },
      'delete': {
        'tags': [
          'sample'
        ],
        'summary': 'Delete A Sample',
        'description': 'Deletes a sample by a specific ID',
        'operationId': 'deleteSampleByID',
        'produces': [
          'application/json'
        ],
        'parameters': [
          {
            'name': 'sampleId',
            'in': 'path',
            'description': 'The ID of a sample',
            'required': true,
            'type': 'string'
          }
        ],
        'responses': {
          '200': {
            'description': 'Successful Operation',
            'schema': {
              '$ref': '#/definitions/Sample'
            }
          },
          '400': {
            'description': 'No Sample With ID Found'
          },
          '401': {
            'description': 'Not Authorized'
          }
        },
        'security': [
          {
            'JWT': []
          }
        ]
      }
    }
  },
  'securityDefinitions': {
    'JWT': {
      'description': 'Stores the JSON Web Token',
      'type': 'apiKey',
      'name': 'Authorization',
      'in': 'header'
    }
  },
  'definitions': {
    'Sample': {
      'type': 'object',
      'properties': {
        '_id': {
          'type': 'string'
        },
        'name': {
          'type': 'string'
        },
        'createdAt': {
          'type': 'string',
          'format': 'date-time'
        },
        'updatedAt': {
          'type': 'string',
          'format': 'date-time'
        },
        'user': {
          '$ref': '#/definitions/User'
        },
        'file': {
          '$ref': '#/definitions/File'
        }
      }
    },
    'User': {
      'type': 'object',
      'properties': {
        '_id': {
          'type': 'string',
          'description': 'A MongoDB id object'
        },
        'email': {
          'type': 'string',
          'description': 'The user\'s identifying email'
        }
      }
    },
    'File': {
      'type': 'object',
      'properties': {
        'id': {
          'type': 'string',
          'description': 'The file name'
        },
        'size': {
          'type': 'integer',
          'description': 'Size of the file'
        },
        'path': {
          'type': 'string',
          'description': 'Absolute path to the file'
        }
      }
    }
  },
  'externalDocs': {
    'description': 'GitHub',
    'url': 'https://github.com/DanielKivi/aphex-backend'
  }
};
