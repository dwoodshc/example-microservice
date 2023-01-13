#!/bin/bash

###############################################################################
# Script to rebuild everything
###############################################################################

images=(
    example-microservice_api
    example-microservice_frontend
    example-microservice_quotes
    example-microservice_test
)

clear
echo "========================================================================="
echo "Full Rebuild of all Images and Containers"
echo "========================================================================="

for image in ${images[@]}
do
  echo "Removing [$image]"
  docker container rm ${image}_1
  docker image rm ${image}
done

API_GATEWAY=http://localhost:3000

cd FrontendApplication/
npm run build
cd ..

docker-compose up
