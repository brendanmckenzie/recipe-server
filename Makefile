build: ui
	go build -o recipe-server

ui:
	$(MAKE) -C cook-ui
