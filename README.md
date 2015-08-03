# PoolPi
Pool Monitor for the Raspberry Pi

* Dependent on sqlite3 being installed.
* Fill in the approriate sparkfun private key in ./libs/store.js.
* To automate, create a shell script that changes to the PoolPi's directory and runs "/usr/local/bin/node start.js".  Set cron to run the shell script once every 30 minutes.
