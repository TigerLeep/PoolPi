# PoolPi
Pool Monitor for the Raspberry Pi

* Dependent on sqlite3 being installed.
* Fill in the approriate sparkfun private key in ./libs/store.js.
* To automate:
  * Create a shell script that changes to the PoolPi's directory and runs ```/usr/local/bin/node start.js```.
  * Set cron to run the shell script once every 30 minutes.

### TODO
* Add more detail to README.js
* Rework the ```trySaveCacheToStore``` function in ```./libs/store.js```.
  * Investigate possibility of removing parallel processing and just have each successful save of a cache entry also delete its cache entry thus eliminating the need to know when they all finish (which was the only reason I used async.parallel).
* Include graph page in repo. 