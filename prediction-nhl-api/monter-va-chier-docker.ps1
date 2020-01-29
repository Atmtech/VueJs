function DetruireLesImages() {
    docker volume prune # Remove all unused volumes
    docker image prune # Remove unused images
    docker system prune # All of the above, in this order: containers, volumes, images
    docker system df # Show docker disk usage, including space reclaimable by pruning
    docker stop $(docker ps -a -q)
    docker rmi -f $(docker images -q)
}

DetruireLesImages
# cd C:\Dev\Atmtech\VueJs\va-chier-api
# docker build -t api-predictionhl.etouelle.com .
# docker run -p 20101:8080 -d api-va-chier.com

# cd C:\Dev\Atmtech\VueJs\va-chier-site
# docker build -t site-predictionhl.etouelle.com .
# docker run -p 20100:80 -d va-chier.com


# Si ca bug rentrer directement dedans
#docker run -it --entrypoint /bin/bash api-va-chier -s
#docker ps
#docker logs <id>

