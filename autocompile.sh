cd skulpt
while true; do
	inotifywait src/lib/socket/__init__.js
	./m dist --uncompressed
done
