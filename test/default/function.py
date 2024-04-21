   
import sys
sys.path.append('./')
from .conditions.test.run import run_test
from .conditions.new.run import run_new

functionBook={
    "test":run_test,"new":run_new
}  
    