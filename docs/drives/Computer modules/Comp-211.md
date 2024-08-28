:::tip Bio 101
:::






<details>
<summary>Exam papers </summary>
- [Bio 101 2021/22 exam](https://google.com)  
- [Bio 101 2022/23 exam](https://google.com)  
- [Bio 101 2023/24 exam ](https://google.com)
</details>

<details>
<summary>Test papers </summary>
- [Bio 101 2021/22 exam](https://google.com)  
- [Bio 101 2022/23 exam](https://google.com)  
- [Bio 101 2023/24 exam ](https://google.com)
</details>

<details>
<summary>Lectures </summary>
- [Bio 101 2021/22 exam](https://google.com)  
- [Bio 101 2022/23 exam](https://google.com)  
- [Bio 101 2023/24 exam ](https://google.com)
</details>

<details>
<summary>Turtorials </summary>
- [Bio 101 2021/22 exam](https://google.com)  
- [Bio 101 2022/23 exam](https://google.com)  
- [Bio 101 2023/24 exam ](https://google.com)
</details>


## Labs

<details>

<summary> Week 2</summary>

## 2

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

## 3
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
## 4
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

## 5
    ```c write a c 
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
<summary> week 3</summary>
</details>



<details>
<summary> week 4</summary>
</details>



<details>
<summary> week 5</summary>
</details>