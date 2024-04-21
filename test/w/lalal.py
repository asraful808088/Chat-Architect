import threading
import time
from time import sleep

# Define a function that will be executed in a separate thread
def print_numbers():
    for i in range(20):
        print(i)
        time.sleep(1)

# Create a new thread and specify the target function
thread = threading.Thread(target=print_numbers)
thread2 = threading.Thread(target=print_numbers)

# Start the thread
thread.start()
sleep(9000)
thread2.start()

# Do something else while the thread is running
print("Main thread continues executing...")


