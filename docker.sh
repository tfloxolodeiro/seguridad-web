nombre_container="sec_web_db"
existe_container=$(docker ps -a --filter "name=^/${nombre_container}$" --format "{{.Status}}")

if [ -z "$existe_container" ]; then
  docker run --name $nombre_container -e POSTGRES_PASSWORD=pepita -d postgres
elif [[ "$existe_container" == *"Exited"* ]]; then
  docker start $nombre_container
fi