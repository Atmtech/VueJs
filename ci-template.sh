cd /etc/serveur/VueJs
sudo git pull https://github.com/Atmtech/VueJs.git
cd /etc/serveur/VueJs/twiggy-api
docker build -t api.twiggy.com .
cd /etc/serveur/VueJs/twiggy-site
docker build -t site.twiggy.com .
docker system prune
cd ..

#sudo docker-compose up