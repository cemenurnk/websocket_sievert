sudo docker build . -t websocket_sievert:1.0
echo Imagen websocket_sievert:1.0 creada correctamente.
read -p 'Puerto: ' port
sudo docker run -p $port:3000 --name websocket_sievert -d websocket_sievert:1.0
echo Contenedor websocket_sievert corriendo en el puerto $port 