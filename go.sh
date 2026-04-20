#!/bin/bash

###############################################################################
# Script to rebuild everything
###############################################################################

images=(
    example-microservice-api
    example-microservice-frontend
    example-microservice-quotes
    example-microservice-test
    example-microservice-news
)

clear
echo " "
echo "========================================================================="
echo "Full Rebuild of all Images and Containers"
echo "========================================================================="
echo " "

# Examples of API Gateway URLs:
# API_GATEWAY=http://localhost:3000
# API_GATEWAY=http://192.168.1.176:3000

if [ $API_GATEWAY ]; then
  echo "OK: Using API Gateway at ${API_GATEWAY}"
else
  echo "ERROR: No API Gateway specified...exiting"
  exit
fi
echo " "


echo "-------------------------------------------------------------------------"
echo "- Image Cleanup"
echo "-------------------------------------------------------------------------"
for image in "${images[@]}"
do
  echo "++++ Processing [$image]"
  pid=$(docker ps -a --filter="name=$image" --format="{{.ID}}")
 
  if [ "$pid" != "" ]
  then
    echo "Container [$image] is running with PID [$pid]...stopping and removing"
    docker container rm -f "${image}-1"
  else
    echo "Container [$image] is not running...no need to stop or remove"
  fi
  docker rmi -f "$image"
  echo " "
  echo " "


done


cd FrontendApplication/
npm run build
cd ..

docker-compose up &
sleep 5


echo "========================================================================="
echo "All done!"
echo "Navigate to http://localhost:8080 to see the frontend application"
echo "========================================================================="  
