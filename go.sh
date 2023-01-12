docker container rm simple-microservice-example_api_1 simple-microservice-example_quotes_1 simple-microservice-example_frontend_1 simple-microservice-example_dave_1

docker image rm simple-microservice-example_api
docker image rm simple-microservice-example_frontend
docker image rm simple-microservice-example_quotes
docker image rm simple-microservice-example_dave


#export API_GATEWAY=http://localhost:3001
#set API_GATEWAY=http://localhost:3002
API_GATEWAY=http://localhost:3000

cd FrontendApplication/
npm run build
cd ..


docker-compose up
