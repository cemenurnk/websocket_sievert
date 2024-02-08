sudo docker stop websocket_sievert
echo Contenedor websocket_sievert detenido.
sudo docker rm websocket_sievert
echo Contenedor websocket_sievert eliminado.
sudo docker rmi websocket_sievert:1.0
echo Imagen websocket_sievert:1.0 eliminada.
git pull
echo Repositorio actualizado.
sudo docker build . -t websocket_sievert:1.0
echo Imagen websocket_sievert:1.0 creada correctamente.
read -p 'Puerto: ' port
sudo docker run -p $port:3000 --name websocket_sievert -d websocket_sievert:1.0
echo Contenedor websocket_sievert corriendo en el puerto $port