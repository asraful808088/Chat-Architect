import asyncio
from time import sleep
from concurrent.futures import ThreadPoolExecutor

async def count_up_timer():
    count = 0
    while True:
        print(f"Count: {count}")
        count += 1
        await asyncio.sleep(1)  # Sleep for 1 second

async def main():
    await count_up_timer()

main()

print("init")
asyncio.run(asyncio.to_thread(sleep, 5))
print("Xx")
asyncio.run(asyncio.to_thread(sleep, 1))
print("finish")
