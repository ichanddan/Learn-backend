string = "this is string"
number = 1
boo = True
print(string, number, boo)

# escape sequence character
# \n for new line and \t for space
st = "This is a string \n new project staring and more information \t xman information "
print(st + string)

# len funcation for get lenght of string
print(len(st))
print("Final String length", len(st + string))


# learn about indexing it is working like js starting with 0

const = "chandan"
print(const[2])

# but we can assing value on index like this formate
# const[2] = 'sadf'


# Slicing
print("sLICING")
slic = "asdfgsdfghfdsasdfghjgfdsaSDFGHJ"
print(slic[2:8])
# Nagative in index working similer with using - 


# Extra String Funcation 
array = 'asdfghjgfdsasdfghjgfdsaSDFGHJGFDSAsdfghjk'

print(array.endswith('zg')) # this is return boolean becurse of he is check only your last value if metched then true else false
print(array.capitalize()) # this function capital only first letter
print(array.replace('a','M')) # just replace character on string
print(array.find('SDFGH'))
print(array.count('f'))


# conditional statement 
age = 14

if(age >= 40):
    print('you are aplicable for this funcation')
elif(age <= 18):
    print('you are not for able for mirage')
else:
    print('tere se na hoga bhai')