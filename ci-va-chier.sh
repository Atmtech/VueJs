cd /etc/serveur/VueJs
sudo git pull https://github.com/Atmtech/VueJs.git
cd /etc/serveur/VueJs/va-chier-api
docker build -t api.va-chier.com .
cd /etc/serveur/VueJs/va-chier-site
docker build -t va-chier.com .
cd ..
sudo docker-compose up