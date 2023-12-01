const { DiscussServiceClient } = require("@google-ai/generativelanguage")
const { GoogleAuth } = require("google-auth-library")
require("dotenv").config()

const MODEL_NAME = "models/chat-bison-001"
const API_KEY = process.env.API_KEY

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
})