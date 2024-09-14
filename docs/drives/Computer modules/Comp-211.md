---

description: A collection of material and resource related to Procdural Programming (211)
hide_table_of_contents: true

last_update:
  date: 4/10/2024
  author: Desiree CH
---
:::warning @Motions 
a shout out to the boy  motions thanks a lot for the code and contributions 👍👍
:::

### Revision Material
A Collection of exams past tests and tutorials

<details>
<summary> Exam papers </summary>

- [2021 exam](https://drive.google.com/file/d/10CE7rNh5XPI5EqKyV-s0J5WyMsI1WbhO/view?usp=drive_link)  
- [2022 exam](https://drive.google.com/file/d/17u2oAOAcG6UkFK-q6ndPgxOVSzlJ4OsR/view?usp=drive_linkhttps://google.com)  
</details>

<details>
<summary>Test papers </summary>

- [test 1](https://drive.google.com/file/d/1Q4DCzDdIJ9OJGDt1kBe1RZHWiliEnqBs/view?usp=drive_link)
- [test 2](https://drive.google.com/file/d/1Q4DCzDdIJ9OJGDt1kBe1RZHWiliEnqBs/view?usp=drive_link)
</details>


## Labs
C labs from week 2 to week 11 
:::danger 🔥🔥 Do Not Copy This 
   > |  most likely some goon is going to copy this and the chances of similar work of code with the exact  same comments being found will be high. Please modify the code Use this as reference and material to teach your self and to predict whats coming up in the labs
:::
<details>

<summary> Week 2</summary>

### Write a C program to calculate simple interest

    ``` c 
    #include <stdio.h>

    int main() {
        float principal, rate, time, interest;

        printf("Enter the Principal amount: ");
        scanf("%f", &principal);

        printf("Enter the Rate of interest: ");
        scanf("%f", &rate);

        printf("Enter the Time (in years): ");
        scanf("%f", &time);

        interest = (principal * rate * time) / 100;

        printf("Simple Interest : %.2f\n", interest);

        return 0;
    }
    ```
<br /><br />

### Write a C program to swap two integers
    ``` c
    #include <stdio.h>

    int main() {
        int num1, num2, temp;

        printf("Enter the first number: ");
        scanf("%d", &num1);

        printf("Enter the second number: ");
        scanf("%d", &num2);

        printf("Before swapping: num1 = %d, num2 = %d\n", num1, num2);

        // Swapping
        temp = num1;
        num1 = num2;
        num2 = temp;

        printf("After swapping: num1 = %d, num2 = %d\n", num1, num2);

        return 0;
    }

    ```
<br /><br />

### Write a C program to accept 5 fraction numbers (floating point numbers) and find sum and average of the numbers
    ```c
    #include <stdio.h>

    int main() {
        float num, sum = 0.0, average;
        int i;

        printf("Enter 5 fraction numbers:\n");

        for(i = 1; i <= 5; i++) {
            printf("Enter number %d: ", i);
            scanf("%f", &num);
            sum += num;
        }

        average = sum / 5;

        printf("Sum of the numbers: %.2f\n", sum);
        printf("Average of the numbers: %.2f\n", average);

        return 0;
    }
        

    ```
<br /><br />

### Write a C program to convert temperature from degree centigrade to Fahrenhei
- this program converts a the value entered and uses the formula C * (9/5) +32 to convert

  ```c  
    #include <stdio.h>

    int main() {
        float celsius, fahrenheit;

        printf("Enter temperature in Celsius: ");
        scanf("%f", &celsius);

        fahrenheit = (celsius * 9 / 5) + 32;

        printf("%.2f Celsius = %.2f Fahrenheit\n", celsius, fahrenheit);

        return 0;
    }


    ```
</details>

<details>
<summary>Week 3-4  </summary>

### Write a C program to find whether given no is even or odd

    ``` c
        #include <stdio.h>

        int main() {
            int num;

            printf("Enter an integer: ");
            scanf("%d", &num);

            if(num % 2 == 0)
                printf("%d is even.\n", num);
            else
                printf("%d is odd.\n", num);

            return 0;
        }


    ```

### Write a C program to find greatest in 3 numbers
    ```c

    #include <stdio.h>

    int main() {
        int num1, num2, num3;

        printf("Enter the first number: ");
        scanf("%d", &num1);

        printf("Enter the second number: ");
        scanf("%d", &num2);

        printf("Enter the third number: ");
        scanf("%d", &num3);

        if(num1 >= num2 && num1 >= num3)
            printf("%d is the greatest number.\n", num1);
        else if(num2 >= num1 && num2 >= num3)
            printf("%d is the greatest number.\n", num2);
        else
            printf("%d is the greatest number.\n", num3);

        return 0;
    }


    ``` 

### Write a C program to find that entered year is leap year or not
    ```c

    #include <stdio.h>

    int main() {
        int year;

        printf("Enter a year: ");
        scanf("%d", &year);

        if(year % 4 == 0) {
            if(year % 100 == 0) {
                // year is divisible by 400, hence the year is a leap year
                if (year % 400 == 0)
                    printf("%d is a leap year.\n", year);
                else
                    printf("%d is not a leap year.\n", year);
            }
            else
                printf("%d is a leap year.\n", year );
        }
        else
            printf("%d is not a leap year.\n", year);
    
        return 0;
    }


    ```

### Write a C program to accept marks scored in a subject and print the result as below If the marks scored is less than 35 print result as fail, if the marks scored is 35 and above and less than 50 print the result as III class, if the marks is 50 and above and less than 60 print result as II class, if the marks is 60 and above and less than 85 print result as I class and if the marks is 85 and above and less than 100 print the result as distinction. [Use if-else statement]
    ```c
    #include <stdio.h>

    int main() {
        int marks;

        printf("Enter the marks scored: ");
        scanf("%d", &marks);

        if(marks < 35)
            printf("Result: Fail\n");
        else if(marks >= 35 && marks < 50)
            printf("Result: III class\n");
        else if(marks >= 50 && marks < 60)
            printf("Result: II class\n");
        else if(marks >= 60 && marks < 85)
            printf("Result: I class\n");
        else if(marks >= 85 && marks <= 100)
            printf("Result: Distinction\n");
        else
            printf("Invalid marks entered. Please enter marks between 0 and 100.\n");

        return 0;
    }


    ```

### Write a C program to do basic arithmetic operations on given two integers by accepting the operator from the user. Use switch case statement to do this program.

:::note HINT
the given operator is +, then program should give sum of given two integers,
if the operator is –, then calculate difference, if operator is * then calculate
product and if the given operator is /, then calculate quotient.
:::

    ``` c
    #include <stdio.h>

    int main() {
        int num1, num2;
        char operator;

        printf("Enter the first number: ");
        scanf("%d", &num1);

        printf("Enter the second number: ");
        scanf("%d", &num2);

        printf("Enter an operator (+, -, *, /): ");
        scanf(" %c", &operator); // Note the space before %c to skip any whitespace characters

        switch(operator) {
            case '+':
                printf("%d + %d = %d\n", num1, num2, num1 + num2);
                break;
            case '-':
                printf("%d - %d = %d\n", num1, num2, num1 - num2);
                break;
            case '*':
                printf("%d * %d = %d\n", num1, num2, num1 * num2);
                break;
            case '/':
                if(num2 != 0)
                    printf("%d / %d = %.2f\n", num1, num2, (float)num1 / num2);
                else
                    printf("Error! Division by zero is not allowed.\n");
                break;
            default:
                printf("Invalid operator.\n");
        }

        return 0;
    }


    ```
</details>



<details>
<summary> week 6</summary>

### Write a C program to generate multiplication table for a given number
    ```c
    #include <stdio.h>

    int main() {
        int num, i;

        printf("Enter a number: ");
        scanf("%d", &num);

        printf("Multiplication table for %d:\n", num);
        for(i = 1; i <= 10; i++) {
            printf("%d * %d = %d\n", num, i, num * i);
        }

        return 0;
    }


    ```

### Write a C program to find factorial of a number
    ```c
    #include <stdio.h>

    int main() {
        int num, i;
        unsigned long long factorial = 1;

        printf("Enter an integer: ");
        scanf("%d", &num);

        if (num < 0)
            printf("Error! Factorial of a negative number doesn't exist.\n");
        else {
            for(i = 1; i <= num; ++i) {
                factorial *= i;
            }
            printf("Factorial of %d = %llu\n", num, factorial);
        }

        return 0;
    }


    ```

### Write a C program to find the sum of individual digits of a positive integer. [Hint: Given positive integer is 4557 [Sum of individual digits of a positive integer = 4+5+5+7=21].
    ```c
    #include <stdio.h>

    int main() {
        int num, temp, digit, sum = 0;

        printf("Enter a positive integer: ");
        scanf("%d", &num);

        temp = num;
        while(temp > 0) {
            digit = temp % 10;
            sum += digit;
            temp /= 10;
        }

        printf("Sum of individual digits of %d = %d\n", num, sum);

        return 0;
    }



    ```

### Write a C program to generate first n natural numbers using for loop.

    ```c
    #include <stdio.h>

    int main() {
        int i, n;

        printf("Enter a positive integer: ");
        scanf("%d", &n);

        printf("First %d natural numbers are: ", n);
        for(i = 1; i <= n; i++) {
            printf("%d ", i);
        }

        return 0;
    }


    ```
</details>



<details>
<summary> week 9</summary>

### Write a C program to find the factorial of a number using recursion.
```c
#include <stdio.h>

// Function to calculate factorial using recursion
unsigned long long factorial(int n) {
    if(n == 0)
        return 1;
    else
        return n * factorial(n - 1);
}

int main() {
    int num;

    printf("Enter an integer: ");
    scanf("%d", &num);

    if (num < 0)
        printf("Error! Factorial of a negative number doesn't exist.\n");
    else {
        printf("Factorial of %d = %llu\n", num, factorial(num));
    }

    return 0;
}


```
### Write a C program to show table of a number using functions
```c
#include <stdio.h>

// Function to print the multiplication table
void printTable(int num) {
    int i;
    for(i = 1; i <= 10; i++) {
        printf("%d * %d = %d\n", num, i, num * i);
    }
}

int main() {
    int num;

    printf("Enter a number: ");
    scanf("%d", &num);

    printf("Multiplication table for %d:\n", num);
    printTable(num);

    return 0;
}


```
### Write a C program to swap two numbers using functions.

```c
#include <stdio.h>

// Function to swap two numbers
void swap(int *num1, int *num2) {
    int temp;

    temp = *num1;
    *num1 = *num2;
    *num2 = temp;
}

int main() {
    int num1, num2;

    printf("Enter the first number: ");
    scanf("%d", &num1);

    printf("Enter the second number: ");
    scanf("%d", &num2);

    printf("Before swapping: num1 = %d, num2 = %d\n", num1, num2);

    // Swapping
    swap(&num1, &num2);

    printf("After swapping: num1 = %d, num2 = %d\n", num1, num2);

    return 0;
}


```

### Write a C program to show table of a number using functions.
```c
#include <stdio.h>

// Function to print the multiplication table
void printTable(int num) {
    int i;
    for(i = 1; i <= 10; i++) {
        printf("%d * %d = %d\n", num, i, num * i);
    }
}

int main() {
    int num;

    printf("Enter a number: ");
    scanf("%d", &num);

    printf("Multiplication table for %d:\n", num);
    printTable(num);

    return 0;
}


```

### Write a C program to find square of a number using functions.
```c
#include <stdio.h>

// Function to calculate the square of a number
int square(int num) {
    return num * num;
}

int main() {
    int num;

    printf("Enter a number: ");
    scanf("%d", &num);

    printf("Square of %d = %d\n", num, square(num));

    return 0;
}


```
</details>


<details>
<summary> week 10</summary>

### Write a C program to accept and print 1_D array.
```c
#include <stdio.h>

int main() {
    int array[10];
    int i;

    printf("Enter 10 integers:\n");

    // Accepting the elements of the array
    for(i = 0; i < 10; i++) {
        printf("Enter element %d: ", i+1);
        scanf("%d", &array[i]);
    }

    // Printing the elements of the array
    printf("\nThe elements of the array are:\n");
    for(i = 0; i < 10; i++) {
        printf("%d ", array[i]);
    }

    return 0;
}
```

### Write a C program to accept and print 2_D array
``` c
#include <stdio.h>

int main() {
    int array[3][3];
    int i, j;

    printf("Enter 9 integers for a 3x3 array:\n");

    // Accepting the elements of the array
    for(i = 0; i < 3; i++) {
        for(j = 0; j < 3; j++) {
            printf("Enter element at [%d][%d]: ", i, j);
            scanf("%d", &array[i][j]);
        }
    }

    // Printing the elements of the array
    printf("\nThe elements of the array are:\n");
    for(i = 0; i < 3; i++) {
        for(j = 0; j < 3; j++) {
            printf("%d ", array[i][j]);
        }
        printf("\n");
    }

    return 0;
}


```

### Write a C program to find sum of two matrices.
```c
#include <stdio.h>

int main() {
    int a[3][3], b[3][3], sum[3][3], i, j;

    printf("Enter elements for first 3x3 matrix:\n");
    for(i = 0; i < 3; i++) {
        for(j = 0; j < 3; j++) {
            printf("Enter element at [%d][%d]: ", i, j);
            scanf("%d", &a[i][j]);
        }
    }

    printf("\nEnter elements for second 3x3 matrix:\n");
    for(i = 0; i < 3; i++) {
        for(j = 0; j < 3; j++) {
            printf("Enter element at [%d][%d]: ", i, j);
            scanf("%d", &b[i][j]);
        }
    }

    // Calculating the sum of the matrices
    for(i = 0; i < 3; i++) {
        for(j = 0; j < 3; j++) {
            sum[i][j] = a[i][j] + b[i][j];
        }
    }

    // Printing the sum of the matrices
    printf("\nThe sum of the matrices is:\n");
    for(i = 0; i < 3; i++) {
        for(j = 0; j < 3; j++) {
            printf("%d ", sum[i][j]);
        }
        printf("\n");
    }

    return 0;
}


```

### Write a C program to find subtraction of two matrices.
```c
#include <stdio.h>

struct Student {
    char name[50];
    int roll;
    float marks;
};

int main() {
    struct Student s;

    printf("Enter information of students:\n");

    printf("Enter name: ");
    fgets(s.name, sizeof(s.name), stdin);

    printf("Enter roll number: ");
    scanf("%d", &s.roll);

    printf("Enter marks: ");
    scanf("%f", &s.marks);

    printf("Displaying Information:\n");
    printf("Name: %s", s.name);
    printf("Roll: %d\n", s.roll);
    printf("Marks: %.2f\n", s.marks);

    return 0;
}


```

### Write a C program to find multiplication of two matrices
```c
#include <stdio.h>

int main() {
    int a[3][3], b[3][3], mult[3][3], r, c, i, sum = 0;

    printf("Enter elements for first 3x3 matrix:\n");
    for(r = 0; r < 3; r++) {
        for(c = 0; c < 3; c++) {
            printf("Enter element at [%d][%d]: ", r, c);
            scanf("%d", &a[r][c]);
        }
    }

    printf("\nEnter elements for second 3x3 matrix:\n");
    for(r = 0; r < 3; r++) {
        for(c = 0; c < 3; c++) {
            printf("Enter element at [%d][%d]: ", r, c);
            scanf("%d", &b[r][c]);
        }
    }

    // Initializing all elements of mult matrix to 0
    for(r = 0; r < 3; r++) {
        for(c = 0; c < 3; c++) {
            mult[r][c] = 0;
        }
    }

    // Calculating multiplication of the matrices
    for(r = 0; r < 3; r++) {
        for(c = 0; c < 3; c++) {
            for(i = 0; i < 3; i++) {
                sum += a[r][i] * b[i][c];
            }
            mult[r][c] = sum;
            sum = 0;
        }
    }

    // Printing the multiplication of the matrices
    printf("\nThe multiplication of the matrices is:\n");
    for(r = 0; r < 3; r++) {
        for(c = 0; c < 3; c++) {
            printf("%d ", mult[r][c]);
        }
        printf("\n");
    }

    return 0;
}


```
</details>

<details>
<summary>week 11</summary>

### Write a c program to copy string using library function strcpy
```c
#include <stdio.h>
#include <string.h>

int main() {
    char source[100], destination[100];

    printf("Enter source string: ");
    fgets(source, sizeof(source), stdin);

    strcpy(destination, source);

    printf("Destination string: %s", destination);

    return 0;
}
```


### Write a C program to concatenate strings.  

``` c
#include <stdio.h>
#include <string.h>

int main() {
    char str1[100], str2[100];

    printf("Enter first string: ");
    fgets(str1, sizeof(str1), stdin);

    printf("Enter second string: ");
    fgets(str2, sizeof(str2), stdin);

    strcat(str1, str2);

    printf("Concatenated string: %s", str1);

    return 0;
}


```

### Write a C palindrome program to find whether the given string is palindrome or not
``` c

#include <stdio.h>
#include <string.h>

int main() {
    char str[100], rev[100];
    int len, i, j;

    printf("Enter a string: ");
    fgets(str, sizeof(str), stdin);

    len = strlen(str) - 1;  // Subtract 1 to ignore the newline character from fgets

    for(i = len - 1, j = 0; i >= 0; i--, j++) {
        rev[j] = str[i];
    }
    rev[j] = '\0';  // Null-terminate the reversed string

    if(strcmp(str, rev) == 0) {
        printf("%s is a palindrome.\n", str);
    } else {
        printf("%s is not a palindrome.\n", str);
    }

    return 0;
}


```
### C Program to store Information (name, roll and marks) of a Student Using sructure.
``` TO BE UPLOADED !!!
```

### Write a C program to store Information of 10 students using structure.
```c
#include <stdio.h>

struct Student {
    char name[50];
    int roll;
    float marks;
};

int main() {
    struct Student s[10];
    int i;

    printf("Enter information of students:\n");

    for(i = 0; i < 10; i++) {
        printf("\nFor roll number%d,\n", i+1);

        printf("Enter name: ");
        scanf("%s", s[i].name);

        printf("Enter marks: ");
        scanf("%f", &s[i].marks);
    }

    printf("\nDisplaying Information:\n\n");
    
    for(i = 0; i < 10; i++) {
        printf("\nInformation for roll number%d:\n", i+1);
        printf("Name: %s\n", s[i].name);
        printf("Marks: %.1f\n", s[i].marks);
    }

    return 0;
}


```
### Write a C program to add two distances (in inch-feet) System Using Structure.
``` c
#include <stdio.h>

struct Distance {
    int feet;
    float inch;
};

int main() {
    struct Distance d1, d2, sum;

    printf("Enter 1st distance\n");
    printf("Enter feet: ");
    scanf("%d", &d1.feet);
    printf("Enter inch: ");
    scanf("%f", &d1.inch);

    printf("\nEnter 2nd distance\n");
    printf("Enter feet: ");
    scanf("%d", &d2.feet);
    printf("Enter inch: ");
    scanf("%f", &d2.inch);

    sum.feet = d1.feet + d2.feet;
    sum.inch = d1.inch + d2.inch;

    // converting inches to feet if inch is greater than 12
    while(sum.inch >= 12.0) {
        sum.inch = sum.inch - 12.0;
        ++sum.feet;
    }

    printf("\nSum of distances = %d\'-%.1f\"", sum.feet, sum.inch);

    return 0;
}


```

</details>