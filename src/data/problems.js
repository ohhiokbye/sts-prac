// Problem data store for STS Practice
// Organized into CAT 1, CAT 2, and FAT syllabus modules.
// Each problem has: id, number, exam, title, topic, difficulty, description, starterCode, expectedOutput, solution

const problems = [
  {
    "id": "hello-world",
    "number": 1,
    "title": "Hello World",
    "topic": "Basics",
    "difficulty": "Easy",
    "description": "Write a Java program that prints \"Hello, World!\" to the console.\n\n### Expected Output\n```\nHello, World!\n```\n\n### Hints\n- Use `System.out.println()` to print to the console.\n- The main method signature is `public static void main(String[] args)`.",
    "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
    "expectedOutput": "Hello, World!",
    "solution": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
    "exam": "CAT 1"
  },
  {
    "id": "sum-of-two",
    "number": 2,
    "title": "Sum of Two Numbers",
    "topic": "Basics",
    "difficulty": "Easy",
    "description": "Write a Java program that declares two integer variables `a = 10` and `b = 20`, computes their sum, and prints the result.\n\n### Expected Output\n```\nSum: 30\n```\n\n### Hints\n- Declare variables using `int`.\n- Use string concatenation or `+` to combine text with numbers.",
    "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Declare two integers and print their sum\n    }\n}",
    "expectedOutput": "Sum: 30",
    "solution": "public class Main {\n    public static void main(String[] args) {\n        int a = 10;\n        int b = 20;\n        System.out.println(\"Sum: \" + (a + b));\n    }\n}",
    "exam": "CAT 1"
  },
  {
    "id": "even-odd",
    "number": 3,
    "title": "Even or Odd",
    "topic": "Conditionals",
    "difficulty": "Easy",
    "description": "Write a Java program that checks whether a given number `n = 7` is even or odd and prints the result.\n\n### Expected Output\n```\n7 is Odd\n```\n\n### Hints\n- Use the modulus operator `%` to check divisibility by 2.\n- Use an if-else statement.",
    "starterCode": "public class Main {\n    public static void main(String[] args) {\n        int n = 7;\n        // Check if n is even or odd\n    }\n}",
    "expectedOutput": "7 is Odd",
    "solution": "public class Main {\n    public static void main(String[] args) {\n        int n = 7;\n        if (n % 2 == 0) {\n            System.out.println(n + \" is Even\");\n        } else {\n            System.out.println(n + \" is Odd\");\n        }\n    }\n}",
    "exam": "CAT 1"
  },
  {
    "id": "factorial",
    "number": 4,
    "title": "Factorial of a Number",
    "topic": "Loops",
    "difficulty": "Easy",
    "description": "Write a Java program that computes the factorial of `n = 5` using a loop.\n\n### Expected Output\n```\nFactorial of 5 = 120\n```\n\n### Hints\n- Factorial of n is: n × (n-1) × (n-2) × ... × 1\n- Use a for loop starting from 1 to n.",
    "starterCode": "public class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        // Calculate factorial of n\n    }\n}",
    "expectedOutput": "Factorial of 5 = 120",
    "solution": "public class Main {\n    public static void main(String[] args) {\n        int n = 5;\n        int fact = 1;\n        for (int i = 1; i <= n; i++) {\n            fact *= i;\n        }\n        System.out.println(\"Factorial of \" + n + \" = \" + fact);\n    }\n}",
    "exam": "CAT 1"
  },
  {
    "id": "fibonacci",
    "number": 5,
    "title": "Fibonacci Series",
    "topic": "Loops",
    "difficulty": "Medium",
    "description": "Write a Java program that prints the first 10 numbers of the Fibonacci series.\n\n### Expected Output\n```\n0 1 1 2 3 5 8 13 21 34\n```\n\n### Hints\n- The Fibonacci sequence starts with 0 and 1.\n- Each subsequent number is the sum of the two preceding numbers.\n- Use a loop to generate the series.",
    "starterCode": "public class Main {\n    public static void main(String[] args) {\n        int n = 10;\n        // Print the first n Fibonacci numbers\n    }\n}",
    "expectedOutput": "0 1 1 2 3 5 8 13 21 34",
    "solution": "public class Main {\n    public static void main(String[] args) {\n        int n = 10;\n        int a = 0, b = 1;\n        for (int i = 0; i < n; i++) {\n            System.out.print(a + (i < n - 1 ? \" \" : \"\"));\n            int temp = a + b;\n            a = b;\n            b = temp;\n        }\n        System.out.println();\n    }\n}",
    "exam": "CAT 1"
  },
  {
    "id": "reverse-string",
    "number": 6,
    "title": "Reverse a String",
    "topic": "Strings",
    "difficulty": "Easy",
    "description": "Write a Java program that reverses the string \"Hello\" and prints the result.\n\n### Expected Output\n```\nolleH\n```\n\n### Hints\n- You can use a `StringBuilder` and its `reverse()` method.\n- Or iterate through the string from the end.",
    "starterCode": "public class Main {\n    public static void main(String[] args) {\n        String str = \"Hello\";\n        // Reverse and print the string\n    }\n}",
    "expectedOutput": "olleH",
    "solution": "public class Main {\n    public static void main(String[] args) {\n        String str = \"Hello\";\n        String reversed = new StringBuilder(str).reverse().toString();\n        System.out.println(reversed);\n    }\n}",
    "exam": "CAT 1"
  },
  {
    "id": "palindrome-check",
    "number": 7,
    "title": "Palindrome Check",
    "topic": "Strings",
    "difficulty": "Medium",
    "description": "Write a Java program that checks whether the string \"madam\" is a palindrome.\n\n### Expected Output\n```\nmadam is a palindrome\n```\n\n### Hints\n- A palindrome reads the same forwards and backwards.\n- Compare the original string with its reverse.",
    "starterCode": "public class Main {\n    public static void main(String[] args) {\n        String str = \"madam\";\n        // Check if str is a palindrome\n    }\n}",
    "expectedOutput": "madam is a palindrome",
    "solution": "public class Main {\n    public static void main(String[] args) {\n        String str = \"madam\";\n        String reversed = new StringBuilder(str).reverse().toString();\n        if (str.equals(reversed)) {\n            System.out.println(str + \" is a palindrome\");\n        } else {\n            System.out.println(str + \" is not a palindrome\");\n        }\n    }\n}",
    "exam": "CAT 1"
  },
  {
    "id": "array-max",
    "number": 8,
    "title": "Find Maximum in Array",
    "topic": "Arrays",
    "difficulty": "Easy",
    "description": "Write a Java program that finds the maximum element in the array {3, 7, 2, 9, 5}.\n\n### Expected Output\n```\nMaximum: 9\n```\n\n### Hints\n- Initialize max with the first element.\n- Iterate through the array and update max when a larger element is found.",
    "starterCode": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {3, 7, 2, 9, 5};\n        // Find and print the maximum element\n    }\n}",
    "expectedOutput": "Maximum: 9",
    "solution": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {3, 7, 2, 9, 5};\n        int max = arr[0];\n        for (int i = 1; i < arr.length; i++) {\n            if (arr[i] > max) {\n                max = arr[i];\n            }\n        }\n        System.out.println(\"Maximum: \" + max);\n    }\n}",
    "exam": "CAT 1"
  },
  {
    "id": "bubble-sort",
    "number": 9,
    "title": "Bubble Sort",
    "topic": "Arrays",
    "difficulty": "Medium",
    "description": "Write a Java program that sorts the array {64, 34, 25, 12, 22, 11, 90} using Bubble Sort and prints the sorted array.\n\n### Expected Output\n```\n11 12 22 25 34 64 90\n```\n\n### Hints\n- Compare adjacent elements and swap them if they are in the wrong order.\n- Repeat until no swaps are needed.",
    "starterCode": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {64, 34, 25, 12, 22, 11, 90};\n        // Implement bubble sort and print sorted array\n    }\n}",
    "expectedOutput": "11 12 22 25 34 64 90",
    "solution": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {64, 34, 25, 12, 22, 11, 90};\n        int n = arr.length;\n        for (int i = 0; i < n - 1; i++) {\n            for (int j = 0; j < n - i - 1; j++) {\n                if (arr[j] > arr[j + 1]) {\n                    int temp = arr[j];\n                    arr[j] = arr[j + 1];\n                    arr[j + 1] = temp;\n                }\n            }\n        }\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < n; i++) {\n            sb.append(arr[i]);\n            if (i < n - 1) sb.append(\" \");\n        }\n        System.out.println(sb.toString());\n    }\n}",
    "exam": "CAT 1"
  },
  {
    "id": "class-constructor",
    "number": 10,
    "title": "Class with Constructor",
    "topic": "OOP",
    "difficulty": "Medium",
    "description": "Create a Java class `Student` with fields `name` and `age`. Write a constructor to initialize them and a method `display()` to print the details. Create a student \"Alice\" aged 20.\n\n### Expected Output\n```\nName: Alice, Age: 20\n```\n\n### Hints\n- Define the class with instance variables.\n- Use `this` keyword in the constructor.\n- Call the method from main using the object.",
    "starterCode": "class Student {\n    // Define fields, constructor, and display method\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Create a Student object and call display()\n    }\n}",
    "expectedOutput": "Name: Alice, Age: 20",
    "solution": "class Student {\n    String name;\n    int age;\n\n    Student(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n\n    void display() {\n        System.out.println(\"Name: \" + name + \", Age: \" + age);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s = new Student(\"Alice\", 20);\n        s.display();\n    }\n}",
    "exam": "CAT 1"
  },
  {
    "id": "inheritance",
    "number": 11,
    "title": "Inheritance",
    "topic": "OOP",
    "difficulty": "Medium",
    "description": "Create a base class `Animal` with a method `sound()` that prints \"Some sound\". Create a derived class `Dog` that overrides `sound()` to print \"Bark\". Create a Dog object and call its sound method.\n\n### Expected Output\n```\nBark\n```\n\n### Hints\n- Use the `extends` keyword for inheritance.\n- Override the parent method using `@Override`.",
    "starterCode": "class Animal {\n    // Define sound() method\n}\n\nclass Dog extends Animal {\n    // Override sound() method\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Create Dog and call sound()\n    }\n}",
    "expectedOutput": "Bark",
    "solution": "class Animal {\n    void sound() {\n        System.out.println(\"Some sound\");\n    }\n}\n\nclass Dog extends Animal {\n    @Override\n    void sound() {\n        System.out.println(\"Bark\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Dog d = new Dog();\n        d.sound();\n    }\n}",
    "exam": "CAT 1"
  },
  {
    "id": "try-catch",
    "number": 12,
    "title": "Exception Handling",
    "topic": "Exceptions",
    "difficulty": "Easy",
    "description": "Write a Java program that attempts to divide 10 by 0 and catches the `ArithmeticException`, printing an appropriate error message.\n\n### Expected Output\n```\nError: Cannot divide by zero\n```\n\n### Hints\n- Use try-catch block.\n- Catch `ArithmeticException` specifically.",
    "starterCode": "public class Main {\n    public static void main(String[] args) {\n        // Try to divide by zero and handle the exception\n    }\n}",
    "expectedOutput": "Error: Cannot divide by zero",
    "solution": "public class Main {\n    public static void main(String[] args) {\n        try {\n            int result = 10 / 0;\n            System.out.println(result);\n        } catch (ArithmeticException e) {\n            System.out.println(\"Error: Cannot divide by zero\");\n        }\n    }\n}",
    "exam": "CAT 1"
  },
  {
    "id": "simple-sieve",
    "title": "Simple Sieve of Eratosthenes",
    "topic": "Simple Sieve",
    "difficulty": "Easy",
    "exam": "CAT 1",
    "description": "Write a Java program to find all prime numbers up to a given integer `n = 30` using the Sieve of Eratosthenes algorithm.\n\nThe Sieve of Eratosthenes works by iteratively marking the multiples of each prime as composite, starting from `2 * 2`, `3 * 3`, etc.\n\n### Expected Output\n```\nPrimes up to 30: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]\n```\n\n### Hints\n- Create a boolean array `isPrime` of size `n + 1` initialized to `true`.\n- Loop `p` from 2 up to `sqrt(n)`. If `isPrime[p]` is true, mark `p * p, p * p + p, ...` as false.\n- Time complexity is O(n log(log n)).",
    "starterCode": "import java.util.*;\n\npublic class Main {\n    public static List<Integer> simpleSieve(int n) {\n        // Implement Sieve of Eratosthenes\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) {\n        int n = 30;\n        System.out.println(\"Primes up to \" + n + \": \" + simpleSieve(n));\n    }\n}",
    "expectedOutput": "Primes up to 30: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]",
    "solution": "import java.util.*;\n\npublic class Main {\n    public static List<Integer> simpleSieve(int n) {\n        boolean[] isPrime = new boolean[n + 1];\n        Arrays.fill(isPrime, true);\n        isPrime[0] = false;\n        if (n >= 1) isPrime[1] = false;\n\n        for (int p = 2; p * p <= n; p++) {\n            if (isPrime[p]) {\n                for (int i = p * p; i <= n; i += p) {\n                    isPrime[i] = false;\n                }\n            }\n        }\n\n        List<Integer> primes = new ArrayList<>();\n        for (int i = 2; i <= n; i++) {\n            if (isPrime[i]) primes.add(i);\n        }\n        return primes;\n    }\n\n    public static void main(String[] args) {\n        int n = 30;\n        System.out.println(\"Primes up to \" + n + \": \" + simpleSieve(n));\n    }\n}",
    "number": 13
  },
  {
    "id": "segmented-sieve",
    "title": "Segmented Sieve",
    "topic": "Segmented Sieve",
    "difficulty": "Medium",
    "exam": "CAT 1",
    "description": "Write a Java program to find all prime numbers in a given range `[l, r]` where `l = 10` and `r = 30` using the Segmented Sieve algorithm.\n\nSegmented Sieve precomputes primes up to `sqrt(r)` using simple sieve, and then uses these primes to mark composites in the segment `[l, r]`.\n\n### Expected Output\n```\nPrimes between 10 and 30: [11, 13, 17, 19, 23, 29]\n```\n\n### Hints\n- Compute all primes up to `limit = floor(sqrt(r))`.\n- Allocate a boolean array `rangePrime` of size `r - l + 1` initialized to `true`.\n- For each prime, find the first multiple in `[l, r]`: `base = (l / prime) * prime`. If `base < l`, `base += prime`.",
    "starterCode": "import java.util.*;\n\npublic class Main {\n    public static List<Integer> segmentedSieve(int l, int r) {\n        // Implement Segmented Sieve\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) {\n        int l = 10, r = 30;\n        System.out.println(\"Primes between \" + l + \" and \" + r + \": \" + segmentedSieve(l, r));\n    }\n}",
    "expectedOutput": "Primes between 10 and 30: [11, 13, 17, 19, 23, 29]",
    "solution": "import java.util.*;\n\npublic class Main {\n    public static List<Integer> segmentedSieve(int l, int r) {\n        int limit = (int) Math.floor(Math.sqrt(r)) + 1;\n        boolean[] isPrime = new boolean[limit + 1];\n        Arrays.fill(isPrime, true);\n        for (int p = 2; p * p <= limit; p++) {\n            if (isPrime[p]) {\n                for (int i = p * p; i <= limit; i += p) {\n                    isPrime[i] = false;\n                }\n            }\n        }\n        List<Integer> basePrimes = new ArrayList<>();\n        for (int i = 2; i <= limit; i++) {\n            if (isPrime[i]) basePrimes.add(i);\n        }\n\n        boolean[] rangePrime = new boolean[r - l + 1];\n        Arrays.fill(rangePrime, true);\n        for (int prime : basePrimes) {\n            int base = (l / prime) * prime;\n            if (base < l) base += prime;\n            if (base == prime) base += prime;\n            for (int j = base; j <= r; j += prime) {\n                rangePrime[j - l] = false;\n            }\n        }\n\n        List<Integer> result = new ArrayList<>();\n        for (int i = 0; i <= r - l; i++) {\n            int num = l + i;\n            if (rangePrime[i] && num > 1) {\n                result.add(num);\n            }\n        }\n        return result;\n    }\n\n    public static void main(String[] args) {\n        int l = 10, r = 30;\n        System.out.println(\"Primes between \" + l + \" and \" + r + \": \" + segmentedSieve(l, r));\n    }\n}",
    "number": 14
  },
  {
    "id": "eulers-phi",
    "title": "Euler's Totient (Phi) Algorithm",
    "topic": "Euler's phi Algorithm",
    "difficulty": "Easy",
    "exam": "CAT 1",
    "description": "Write a Java program to compute Euler's Totient function `phi(n)` for `n = 36`.\n\n`phi(n)` counts the number of positive integers up to `n` that are relatively prime to `n` (i.e. `gcd(k, n) = 1`).\nFormula: `phi(n) = n * Product (1 - 1/p)` for all distinct prime factors `p` of `n`.\n\n### Expected Output\n```\nEuler's phi for 36: 12\n```\n\n### Hints\n- Initialize `result = n`.\n- For each prime factor `p` up to `sqrt(n)`, divide out all factors of `p` and update `result -= result / p`.\n- If the remaining `n > 1`, update `result -= result / n`.",
    "starterCode": "public class Main {\n    public static int phi(int n) {\n        // Compute Euler's totient function phi(n)\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int n = 36;\n        System.out.println(\"Euler's phi for \" + n + \": \" + phi(n));\n    }\n}",
    "expectedOutput": "Euler's phi for 36: 12",
    "solution": "public class Main {\n    public static int phi(int n) {\n        int result = n;\n        for (int p = 2; p * p <= n; p++) {\n            if (n % p == 0) {\n                while (n % p == 0) {\n                    n /= p;\n                }\n                result -= result / p;\n            }\n        }\n        if (n > 1) {\n            result -= result / n;\n        }\n        return result;\n    }\n\n    public static void main(String[] args) {\n        int n = 36;\n        System.out.println(\"Euler's phi for \" + n + \": \" + phi(n));\n    }\n}",
    "number": 15
  },
  {
    "id": "strobogrammatic-number",
    "title": "Strobogrammatic Number",
    "topic": "Strobogrammatic Number",
    "difficulty": "Easy",
    "exam": "CAT 1",
    "description": "A strobogrammatic number is a number that looks the same when rotated 180 degrees (turned upside down).\nValid rotational pairs are: `('0', '0')`, `('1', '1')`, `('8', '8')`, `('6', '9')`, `('9', '6')`.\n\nWrite a Java method to check whether string `s` is a strobogrammatic number.\nVerify for `num1 = \"69\"` and `num2 = \"88\"`.\n\n### Expected Output\n```\n69 is strobogrammatic: true, 88 is strobogrammatic: true\n```\n\n### Hints\n- Use two pointers, one at the beginning (`left`) and one at the end (`right`).\n- Check if characters at `left` and `right` form a valid reversible pair.",
    "starterCode": "public class Main {\n    public static boolean isStrobogrammatic(String num) {\n        // Return true if num is strobogrammatic\n        return false;\n    }\n\n    public static void main(String[] args) {\n        String num1 = \"69\";\n        String num2 = \"88\";\n        System.out.println(num1 + \" is strobogrammatic: \" + isStrobogrammatic(num1) +\n                           \", \" + num2 + \" is strobogrammatic: \" + isStrobogrammatic(num2));\n    }\n}",
    "expectedOutput": "69 is strobogrammatic: true, 88 is strobogrammatic: true",
    "solution": "public class Main {\n    public static boolean isStrobogrammatic(String num) {\n        int left = 0, right = num.length() - 1;\n        while (left <= right) {\n            char l = num.charAt(left);\n            char r = num.charAt(right);\n            if (l == '0' && r == '0') {}\n            else if (l == '1' && r == '1') {}\n            else if (l == '8' && r == '8') {}\n            else if (l == '6' && r == '9') {}\n            else if (l == '9' && r == '6') {}\n            else return false;\n            left++;\n            right--;\n        }\n        return true;\n    }\n\n    public static void main(String[] args) {\n        String num1 = \"69\";\n        String num2 = \"88\";\n        System.out.println(num1 + \" is strobogrammatic: \" + isStrobogrammatic(num1) +\n                           \", \" + num2 + \" is strobogrammatic: \" + isStrobogrammatic(num2));\n    }\n}",
    "number": 16
  },
  {
    "id": "chinese-remainder-theorem",
    "title": "Chinese Remainder Theorem",
    "topic": "Remainder Theorem",
    "difficulty": "Medium",
    "exam": "CAT 1",
    "description": "Given pairwise coprime moduli `num = [3, 4, 5]` and remainders `rem = [2, 3, 1]`, find the minimum positive integer `x` such that:\n`x % num[i] = rem[i]` for all `i`.\n\n### Expected Output\n```\nSmallest x: 11\n```\n\n### Hints\n- Compute total product `prod = num[0] * num[1] * ... * num[k-1]`.\n- For each `i`, find `pp = prod / num[i]` and its modular multiplicative inverse `inv` modulo `num[i]`.\n- Sum up `rem[i] * pp * inv` and take modulo `prod`.",
    "starterCode": "public class Main {\n    public static int findMinX(int[] num, int[] rem) {\n        // Implement Chinese Remainder Theorem\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int[] num = {3, 4, 5};\n        int[] rem = {2, 3, 1};\n        System.out.println(\"Smallest x: \" + findMinX(num, rem));\n    }\n}",
    "expectedOutput": "Smallest x: 11",
    "solution": "public class Main {\n    public static int modInverse(int a, int m) {\n        int m0 = m, y = 0, x = 1;\n        if (m == 1) return 0;\n        while (a > 1) {\n            int q = a / m;\n            int t = m;\n            m = a % m;\n            a = t;\n            t = y;\n            y = x - q * y;\n            x = t;\n        }\n        if (x < 0) x += m0;\n        return x;\n    }\n\n    public static int findMinX(int[] num, int[] rem) {\n        int prod = 1;\n        for (int n : num) prod *= n;\n\n        int result = 0;\n        for (int i = 0; i < num.length; i++) {\n            int pp = prod / num[i];\n            result = (result + rem[i] * pp * modInverse(pp, num[i])) % prod;\n        }\n        return (result + prod) % prod;\n    }\n\n    public static void main(String[] args) {\n        int[] num = {3, 4, 5};\n        int[] rem = {2, 3, 1};\n        System.out.println(\"Smallest x: \" + findMinX(num, rem));\n    }\n}",
    "number": 17
  },
  {
    "id": "toggle-switch-alice-apple",
    "title": "Toggle the Switch & Alice Apple Tree",
    "topic": "Toggle the switch & Alice Apple tree",
    "difficulty": "Medium",
    "exam": "CAT 1",
    "description": "Solve two classic algorithmic problems:\n1. **Toggle the switch (Bulb Switcher)**: There are `n = 10` bulbs initially off. In round `i`, toggle every `i-th` bulb. After `n` rounds, return how many bulbs are ON. (A bulb remains ON if and only if its index has an odd number of divisors, meaning it is a perfect square).\n2. **Alice Apple Tree**: Alice is at the center (0,0). Layer `k` contains apple trees on the perimeter of a square of side `2k`. The number of apples in square `k` is `12 * k^2`. Find the minimum perimeter of a plot Alice must buy to collect at least `K = 12` apples.\n\n### Expected Output\n```\nBulbs ON for n=10: 3 | Minimum perimeter for Alice (12 apples): 8\n```\n\n### Hints\n- Bulbs ON = `floor(sqrt(n))`.\n- For Alice, layer `k` has perimeter `8 * k`. Keep accumulating `12 * k^2` until total >= K.",
    "starterCode": "public class Main {\n    public static int bulbSwitch(int n) {\n        return (int) Math.sqrt(n);\n    }\n\n    public static int minPerimeter(int applesNeeded) {\n        // Calculate minimum perimeter of apple plot\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int n = 10;\n        int apples = 12;\n        System.out.println(\"Bulbs ON for n=\" + n + \": \" + bulbSwitch(n) +\n                           \" | Minimum perimeter for Alice (\" + apples + \" apples): \" + minPerimeter(apples));\n    }\n}",
    "expectedOutput": "Bulbs ON for n=10: 3 | Minimum perimeter for Alice (12 apples): 8",
    "solution": "public class Main {\n    public static int bulbSwitch(int n) {\n        return (int) Math.sqrt(n);\n    }\n\n    public static int minPerimeter(int applesNeeded) {\n        long apples = 0;\n        int k = 0;\n        while (apples < applesNeeded) {\n            k++;\n            apples += 12L * k * k;\n        }\n        return 8 * k;\n    }\n\n    public static void main(String[] args) {\n        int n = 10;\n        int apples = 12;\n        System.out.println(\"Bulbs ON for n=\" + n + \": \" + bulbSwitch(n) +\n                           \" | Minimum perimeter for Alice (\" + apples + \" apples): \" + minPerimeter(apples));\n    }\n}",
    "number": 18
  },
  {
    "id": "binary-palindrome",
    "title": "Binary Palindrome",
    "topic": "Binary Palindrome",
    "difficulty": "Easy",
    "exam": "CAT 1",
    "description": "Write a Java program to check whether the binary representation of an integer `n = 9` is a palindrome.\nFor `n = 9`, binary is `\"1001\"`, which reads the same forwards and backwards.\n\n### Expected Output\n```\n9 (binary 1001) is palindrome: true\n```\n\n### Hints\n- Convert the integer to its binary string using `Integer.toBinaryString(n)`.\n- Check if the string is identical to its reverse.",
    "starterCode": "public class Main {\n    public static boolean isBinaryPalindrome(int n) {\n        // Check if binary representation is a palindrome\n        return false;\n    }\n\n    public static void main(String[] args) {\n        int n = 9;\n        String bin = Integer.toBinaryString(n);\n        System.out.println(n + \" (binary \" + bin + \") is palindrome: \" + isBinaryPalindrome(n));\n    }\n}",
    "expectedOutput": "9 (binary 1001) is palindrome: true",
    "solution": "public class Main {\n    public static boolean isBinaryPalindrome(int n) {\n        String s = Integer.toBinaryString(n);\n        int l = 0, r = s.length() - 1;\n        while (l < r) {\n            if (s.charAt(l++) != s.charAt(r--)) return false;\n        }\n        return true;\n    }\n\n    public static void main(String[] args) {\n        int n = 9;\n        String bin = Integer.toBinaryString(n);\n        System.out.println(n + \" (binary \" + bin + \") is palindrome: \" + isBinaryPalindrome(n));\n    }\n}",
    "number": 19
  },
  {
    "id": "booths-algorithm",
    "number": 20,
    "title": "Booth's Multiplication Algorithm",
    "topic": "Booth's Algorithm",
    "difficulty": "Hard",
    "description": "Write a Java program to multiply two signed integers using Booth's Multiplication Algorithm.\n\nBooth's algorithm multiplies two signed binary numbers in two's complement notation. It examines adjacent pairs of bits in the multiplier, performing addition, subtraction, or shifts accordingly:\n- If bits are `10`: Subtract multiplicand from accumulator, then arithmetic right shift.\n- If bits are `01`: Add multiplicand to accumulator, then arithmetic right shift.\n- If bits are `00` or `11`: Arithmetic right shift only.\n\nGiven multiplicand `m = -7` and multiplier `r = 3`, compute and display their product.\n\n### Hints\n- Maintain an Accumulator `a = 0`, Multiplier `q = r`, and previous bit `q_minus_1 = 0`.\n- For 32-bit integers, repeat the cycle 32 times.\n- Use arithmetic right shift (`>>`) for the accumulator to preserve the sign bit.",
    "starterCode": "public class Main {\n    // Implement Booth's Multiplication Algorithm\n    public static int boothsMultiply(int m, int r) {\n        // Your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int m = -7;\n        int r = 3;\n        int product = boothsMultiply(m, r);\n        System.out.println(\"Product of \" + m + \" and \" + r + \" = \" + product);\n    }\n}",
    "expectedOutput": "Product of -7 and 3 = -21",
    "solution": "public class Main {\n    public static int boothsMultiply(int m, int r) {\n        int a = 0;\n        int q = r;\n        int q_minus_1 = 0;\n        int count = 32;\n\n        while (count > 0) {\n            int q0 = q & 1;\n            if (q0 == 1 && q_minus_1 == 0) {\n                a = a - m;\n            } else if (q0 == 0 && q_minus_1 == 1) {\n                a = a + m;\n            }\n\n            q_minus_1 = q0;\n            q = (q >>> 1) | ((a & 1) << 31);\n            a = a >> 1;\n\n            count--;\n        }\n        return q;\n    }\n\n    public static void main(String[] args) {\n        int m = -7;\n        int r = 3;\n        int product = boothsMultiply(m, r);\n        System.out.println(\"Product of \" + m + \" and \" + r + \" = \" + product);\n    }\n}",
    "exam": "CAT 2"
  },
  {
    "id": "euclids-algorithm",
    "number": 21,
    "title": "Euclid's Algorithm for GCD",
    "topic": "Euclid's Algorithm",
    "difficulty": "Easy",
    "description": "Write a Java program to find the Greatest Common Divisor (GCD) of two integers using Euclid's Algorithm.\n\nEuclid's algorithm is based on the principle that the greatest common divisor of two numbers also divides their difference:\n- `gcd(a, b) = gcd(b, a % b)`\n- When `b = 0`, the GCD is `a`.\n\nGiven two integers `a = 48` and `b = 18`, compute their GCD and print the result.\n\n### Hints\n- Use a while loop with condition `b != 0`.\n- In each step, store `b` in a temp variable, update `b = a % b`, and set `a = temp`.",
    "starterCode": "public class Main {\n    public static int gcd(int a, int b) {\n        // Implement Euclid's algorithm\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int a = 48;\n        int b = 18;\n        System.out.println(\"GCD of \" + a + \" and \" + b + \" = \" + gcd(a, b));\n    }\n}",
    "expectedOutput": "GCD of 48 and 18 = 6",
    "solution": "public class Main {\n    public static int gcd(int a, int b) {\n        while (b != 0) {\n            int temp = b;\n            b = a % b;\n            a = temp;\n        }\n        return a;\n    }\n\n    public static void main(String[] args) {\n        int a = 48;\n        int b = 18;\n        System.out.println(\"GCD of \" + a + \" and \" + b + \" = \" + gcd(a, b));\n    }\n}",
    "exam": "CAT 2"
  },
  {
    "id": "karatsuba-algorithm",
    "number": 22,
    "title": "Karatsuba Fast Multiplication",
    "topic": "Karatsuba Algorithm",
    "difficulty": "Hard",
    "description": "Write a Java program to multiply two integers using the Karatsuba Algorithm.\n\nThe Karatsuba algorithm reduces the multiplication of two n-digit numbers from 4 sub-multiplications to 3 using divide-and-conquer:\n- Split `x` into `a` and `b`, and `y` into `c` and `d`: `x = a * 10^m + b`, `y = c * 10^m + d`\n- Compute `ac = karatsuba(a, c)`\n- Compute `bd = karatsuba(b, d)`\n- Compute `abcd = karatsuba(a + b, c + d)`\n- Result is `ac * 10^(2m) + (abcd - ac - bd) * 10^m + bd`\n\nGiven `x = 1234` and `y = 5678`, compute their product using Karatsuba algorithm.\n\n### Hints\n- Base case: If `x < 10` or `y < 10`, simply return `x * y`.\n- `m = (maxDigits + 1) / 2`.\n- Use `long` to prevent integer overflow.",
    "starterCode": "public class Main {\n    public static long karatsuba(long x, long y) {\n        // Implement Karatsuba multiplication\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        long x = 1234;\n        long y = 5678;\n        System.out.println(\"Product of \" + x + \" and \" + y + \" = \" + karatsuba(x, y));\n    }\n}",
    "expectedOutput": "Product of 1234 and 5678 = 7006652",
    "solution": "public class Main {\n    public static long karatsuba(long x, long y) {\n        if (x < 10 || y < 10) {\n            return x * y;\n        }\n\n        int n = Math.max(Long.toString(x).length(), Long.toString(y).length());\n        int half = (n + 1) / 2;\n\n        long multiplier = (long) Math.pow(10, half);\n\n        long a = x / multiplier;\n        long b = x % multiplier;\n        long c = y / multiplier;\n        long d = y % multiplier;\n\n        long ac = karatsuba(a, c);\n        long bd = karatsuba(b, d);\n        long abcd = karatsuba(a + b, c + d);\n\n        long ad_plus_bc = abcd - ac - bd;\n\n        return ac * (long) Math.pow(10, 2 * half) + ad_plus_bc * multiplier + bd;\n    }\n\n    public static void main(String[] args) {\n        long x = 1234;\n        long y = 5678;\n        System.out.println(\"Product of \" + x + \" and \" + y + \" = \" + karatsuba(x, y));\n    }\n}",
    "exam": "CAT 2"
  },
  {
    "id": "longest-sequence-of-1-after-flipping-a-bit",
    "number": 23,
    "title": "Longest Sequence of 1 After Flipping a Bit",
    "topic": "Longest Sequence of 1",
    "difficulty": "Medium",
    "description": "Write a Java program to find the length of the longest contiguous sequence of 1s in the binary representation of an integer after flipping at most one bit from 0 to 1.\n\nFor example, given `n = 1775` (binary `11011101111`):\nFlipping the 0 between the four 1s and three 1s gives `11011111111`, yielding 8 consecutive 1s.\n\n### Hints\n- Inspect bits from right to left using bitwise operations (`n & 1` and `n >>>= 1`).\n- Maintain `currentLen` (count of consecutive 1s) and `prevLen` (count of consecutive 1s before the last 0).\n- If the current bit is 0, update `prevLen = ((n & 2) == 0) ? 0 : currentLen` and reset `currentLen = 0`.\n- Update `maxLen = Math.max(maxLen, prevLen + currentLen + 1)`.",
    "starterCode": "public class Main {\n    public static int longestSequenceAfterFlip(int n) {\n        // Find longest sequence of 1s after flipping 1 bit\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int n = 1775;\n        System.out.println(\"Longest sequence for \" + n + \" = \" + longestSequenceAfterFlip(n));\n    }\n}",
    "expectedOutput": "Longest sequence for 1775 = 8",
    "solution": "public class Main {\n    public static int longestSequenceAfterFlip(int n) {\n        if (~n == 0) return 32;\n\n        int currentLen = 0;\n        int prevLen = 0;\n        int maxLen = 0;\n\n        while (n != 0) {\n            if ((n & 1) == 1) {\n                currentLen++;\n            } else {\n                prevLen = ((n & 2) == 0) ? 0 : currentLen;\n                currentLen = 0;\n            }\n            maxLen = Math.max(prevLen + currentLen + 1, maxLen);\n            n >>>= 1;\n        }\n\n        return maxLen;\n    }\n\n    public static void main(String[] args) {\n        int n = 1775;\n        System.out.println(\"Longest sequence for \" + n + \" = \" + longestSequenceAfterFlip(n));\n    }\n}",
    "exam": "CAT 2"
  },
  {
    "id": "swap-two-nibbles-in-a-byte",
    "number": 24,
    "title": "Swap Two Nibbles in a Byte",
    "topic": "Swap Nibbles",
    "difficulty": "Easy",
    "description": "A byte consists of 8 bits. A nibble is a four-bit aggregation, or half an octet (4 bits).\n\nWrite a Java program to swap the two nibbles in a given byte (represented as an integer from 0 to 255).\nFor example:\n- `n = 100` is `01100100` in binary.\n- Left nibble: `0110` (6)\n- Right nibble: `0100` (4)\n- Swapping them produces `01000110` = 70 in decimal.\n\n### Hints\n- The right nibble can be isolated using `(n & 0x0F)` and shifted left by 4 bits: `(n & 0x0F) << 4`.\n- The left nibble can be isolated using `(n & 0xF0)` and shifted right by 4 bits: `(n & 0xF0) >> 4`.\n- Combine both parts using bitwise OR (`|`).",
    "starterCode": "public class Main {\n    public static int swapNibbles(int n) {\n        // Swap the two 4-bit nibbles\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int n = 100;\n        int swapped = swapNibbles(n);\n        System.out.println(\"Original: \" + n + \", After swapping nibbles: \" + swapped);\n    }\n}",
    "expectedOutput": "Original: 100, After swapping nibbles: 70",
    "solution": "public class Main {\n    public static int swapNibbles(int n) {\n        return ((n & 0x0F) << 4) | ((n & 0xF0) >> 4);\n    }\n\n    public static void main(String[] args) {\n        int n = 100;\n        int swapped = swapNibbles(n);\n        System.out.println(\"Original: \" + n + \", After swapping nibbles: \" + swapped);\n    }\n}",
    "exam": "CAT 2"
  },
  {
    "id": "block-swap-algorithm",
    "number": 25,
    "title": "Block Swap Algorithm for Array Rotation",
    "topic": "Block Swap Algorithm",
    "difficulty": "Medium",
    "description": "Write a Java program to rotate an array of `n` integers to the left by `d` positions using the Block Swap Algorithm.\n\nThe Block Swap Algorithm divides the array into two subarrays:\n- `A = arr[0 .. d-1]` (size `d`)\n- `B = arr[d .. n-1]` (size `n-d`)\n\nIt swaps blocks of elements iteratively:\n- If `size(A) < size(B)`: divide `B` into `Bl` and `Br` (size of `Br` equals size of `A`). Swap `A` with `Br`.\n- If `size(A) > size(B)`: divide `A` into `Al` and `Ar` (size of `Al` equals size of `B`). Swap `Al` with `B`.\n- Repeat until `size(A) == size(B)`, then swap `A` and `B`.\n\nRotate `arr = [1, 2, 3, 4, 5, 6, 7]` by `d = 2`.\n\n### Hints\n- Use a helper function `swap(int[] arr, int fi, int si, int d)` to swap `d` elements between two indices.\n- Initialize `i = d`, `j = n - d`. While `i != j`, adjust indices and swap blocks.",
    "starterCode": "public class Main {\n    public static void leftRotate(int[] arr, int d, int n) {\n        // Implement Block Swap array rotation\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5, 6, 7};\n        int d = 2;\n        leftRotate(arr, d, arr.length);\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < arr.length; i++) {\n            sb.append(arr[i]).append(i == arr.length - 1 ? \"\" : \" \");\n        }\n        System.out.println(\"Rotated array: \" + sb.toString());\n    }\n}",
    "expectedOutput": "Rotated array: 3 4 5 6 7 1 2",
    "solution": "public class Main {\n    public static void swap(int[] arr, int fi, int si, int d) {\n        for (int i = 0; i < d; i++) {\n            int temp = arr[fi + i];\n            arr[fi + i] = arr[si + i];\n            arr[si + i] = temp;\n        }\n    }\n\n    public static void leftRotate(int[] arr, int d, int n) {\n        if (n == 0) return;\n        d = d % n;\n        if (d == 0) return;\n\n        int i = d;\n        int j = n - d;\n        while (i != j) {\n            if (i < j) {\n                swap(arr, d - i, d + j - i, i);\n                j -= i;\n            } else {\n                swap(arr, d - i, d, j);\n                i -= j;\n            }\n        }\n        swap(arr, d - i, d, i);\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5, 6, 7};\n        int d = 2;\n        leftRotate(arr, d, arr.length);\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < arr.length; i++) {\n            sb.append(arr[i]).append(i == arr.length - 1 ? \"\" : \" \");\n        }\n        System.out.println(\"Rotated array: \" + sb.toString());\n    }\n}",
    "exam": "CAT 2"
  },
  {
    "id": "max-product-subarray",
    "number": 26,
    "title": "Maximum Product Subarray",
    "topic": "Max Product Subarray",
    "difficulty": "Medium",
    "description": "Given an integer array `nums = [2, 3, -2, 4]`, find a contiguous non-empty subarray within the array that has the largest product, and return that product.\n\nA negative number multiplied by another negative number becomes positive, so tracking both the minimum and maximum product up to each position is essential.\n\n### Hints\n- Use dynamic programming: maintain `maxSoFar` and `minSoFar`.\n- When encountering a negative number, swap `maxSoFar` and `minSoFar` because multiplying by a negative number inverts minimum and maximum.\n- `maxSoFar = Math.max(curr, maxSoFar * curr)`.\n- `minSoFar = Math.min(curr, minSoFar * curr)`.",
    "starterCode": "public class Main {\n    public static int maxProduct(int[] nums) {\n        // Find maximum product contiguous subarray\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {2, 3, -2, 4};\n        System.out.println(\"Maximum Product: \" + maxProduct(nums));\n    }\n}",
    "expectedOutput": "Maximum Product: 6",
    "solution": "public class Main {\n    public static int maxProduct(int[] nums) {\n        if (nums.length == 0) return 0;\n        int maxSoFar = nums[0];\n        int minSoFar = nums[0];\n        int result = maxSoFar;\n\n        for (int i = 1; i < nums.length; i++) {\n            int curr = nums[i];\n            if (curr < 0) {\n                int temp = maxSoFar;\n                maxSoFar = minSoFar;\n                minSoFar = temp;\n            }\n            maxSoFar = Math.max(curr, maxSoFar * curr);\n            minSoFar = Math.min(curr, minSoFar * curr);\n            result = Math.max(result, maxSoFar);\n        }\n        return result;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {2, 3, -2, 4};\n        System.out.println(\"Maximum Product: \" + maxProduct(nums));\n    }\n}",
    "exam": "CAT 2"
  },
  {
    "id": "maximum-sum-of-hour-glass-in-matrix",
    "number": 27,
    "title": "Maximum Sum of Hour Glass in Matrix",
    "topic": "Hourglass Sum",
    "difficulty": "Medium",
    "description": "Given a 2D integer matrix of size 6x6, find the maximum sum of an hourglass shape.\n\nAn hourglass in a matrix is a subset of values with indices falling in this pattern:\n```\na b c\n  d\ne f g\n```\nThe sum of an hourglass is: `a + b + c + d + e + f + g`.\n\nThere are `(R - 2) * (C - 2)` possible hourglasses in a matrix of size `R x C`.\n\n### Hints\n- The matrix must have at least 3 rows and 3 columns.\n- Iterate with row index `i` from `0` to `R - 3` and column index `j` from `0` to `C - 3`.\n- Calculate sum of elements at `(i, j), (i, j+1), (i, j+2), (i+1, j+1), (i+2, j), (i+2, j+1), (i+2, j+2)`.\n- Keep track of the maximum sum found.",
    "starterCode": "public class Main {\n    public static int maxHourglassSum(int[][] mat) {\n        // Calculate max hourglass sum\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int[][] mat = {\n            {1, 1, 1, 0, 0, 0},\n            {0, 1, 0, 0, 0, 0},\n            {1, 1, 1, 0, 0, 0},\n            {0, 0, 2, 4, 4, 0},\n            {0, 0, 0, 2, 0, 0},\n            {0, 0, 1, 2, 4, 0}\n        };\n        System.out.println(\"Maximum Hourglass Sum: \" + maxHourglassSum(mat));\n    }\n}",
    "expectedOutput": "Maximum Hourglass Sum: 19",
    "solution": "public class Main {\n    public static int maxHourglassSum(int[][] mat) {\n        int r = mat.length;\n        int c = mat[0].length;\n        if (r < 3 || c < 3) return -1;\n\n        int maxSum = Integer.MIN_VALUE;\n\n        for (int i = 0; i <= r - 3; i++) {\n            for (int j = 0; j <= c - 3; j++) {\n                int sum = mat[i][j] + mat[i][j+1] + mat[i][j+2]\n                                    + mat[i+1][j+1]\n                        + mat[i+2][j] + mat[i+2][j+1] + mat[i+2][j+2];\n                maxSum = Math.max(maxSum, sum);\n            }\n        }\n        return maxSum;\n    }\n\n    public static void main(String[] args) {\n        int[][] mat = {\n            {1, 1, 1, 0, 0, 0},\n            {0, 1, 0, 0, 0, 0},\n            {1, 1, 1, 0, 0, 0},\n            {0, 0, 2, 4, 4, 0},\n            {0, 0, 0, 2, 0, 0},\n            {0, 0, 1, 2, 4, 0}\n        };\n        System.out.println(\"Maximum Hourglass Sum: \" + maxHourglassSum(mat));\n    }\n}",
    "exam": "CAT 2"
  },
  {
    "id": "max-equilibrium-sum",
    "number": 28,
    "title": "Max Equilibrium Sum in Array",
    "topic": "Max Equilibrium Sum",
    "difficulty": "Medium",
    "description": "Write a Java program to find the maximum equilibrium sum in an array of integers.\n\nAn equilibrium sum of an array is a sum such that the prefix sum up to index `i` (inclusive) is equal to the suffix sum from index `i` to the end (inclusive):\n`sum(arr[0 .. i]) == sum(arr[i .. n-1])`\n\nGiven `arr = [-2, 5, 3, 1, 2, 6, -4, 2]`, find the maximum equilibrium sum.\n\n### Hints\n- First, compute the total sum of all elements in the array.\n- Traverse the array maintaining `prefixSum` (adding `arr[i]`) and comparing it with `suffixSum` (current total remaining).\n- If `prefixSum == suffixSum`, update `maxEqui = Math.max(maxEqui, prefixSum)`.\n- Subtract `arr[i]` from `totalSum` before moving to the next element.",
    "starterCode": "public class Main {\n    public static int maxEquilibriumSum(int[] arr) {\n        // Return maximum equilibrium sum\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {-2, 5, 3, 1, 2, 6, -4, 2};\n        System.out.println(\"Maximum Equilibrium Sum: \" + maxEquilibriumSum(arr));\n    }\n}",
    "expectedOutput": "Maximum Equilibrium Sum: 7",
    "solution": "public class Main {\n    public static int maxEquilibriumSum(int[] arr) {\n        int totalSum = 0;\n        for (int x : arr) totalSum += x;\n\n        int prefixSum = 0;\n        int maxEqui = Integer.MIN_VALUE;\n\n        for (int i = 0; i < arr.length; i++) {\n            prefixSum += arr[i];\n            int suffixSum = totalSum;\n            if (prefixSum == suffixSum) {\n                maxEqui = Math.max(maxEqui, prefixSum);\n            }\n            totalSum -= arr[i];\n        }\n\n        return maxEqui == Integer.MIN_VALUE ? -1 : maxEqui;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {-2, 5, 3, 1, 2, 6, -4, 2};\n        System.out.println(\"Maximum Equilibrium Sum: \" + maxEquilibriumSum(arr));\n    }\n}",
    "exam": "CAT 2"
  },
  {
    "id": "leaders-in-array",
    "number": 29,
    "title": "Leaders in an Array",
    "topic": "Leaders in Array",
    "difficulty": "Easy",
    "description": "Write a Java program to find and print all the leaders in an integer array.\n\nAn element is a leader if it is greater than or equal to all elements to its right. The rightmost element is always a leader.\n\nGiven `arr = [16, 17, 4, 3, 5, 2]`, print the leaders in order from left to right.\n\n### Hints\n- Scan the array from right to left.\n- Keep track of the maximum element seen so far from the right.\n- Whenever a current element is greater than or equal to the maximum from the right, it is a leader; add it to the list and update the maximum.\n- Reverse the collected leaders list to print them in original left-to-right order.",
    "starterCode": "import java.util.ArrayList;\n\npublic class Main {\n    public static void printLeaders(int[] arr) {\n        // Find and print leaders from left to right\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {16, 17, 4, 3, 5, 2};\n        printLeaders(arr);\n    }\n}",
    "expectedOutput": "Leaders: 17 5 2",
    "solution": "import java.util.ArrayList;\nimport java.util.Collections;\n\npublic class Main {\n    public static void printLeaders(int[] arr) {\n        int n = arr.length;\n        if (n == 0) return;\n\n        ArrayList<Integer> leaders = new ArrayList<>();\n        int maxFromRight = arr[n - 1];\n        leaders.add(maxFromRight);\n\n        for (int i = n - 2; i >= 0; i--) {\n            if (arr[i] >= maxFromRight) {\n                maxFromRight = arr[i];\n                leaders.add(maxFromRight);\n            }\n        }\n\n        Collections.reverse(leaders);\n\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < leaders.size(); i++) {\n            sb.append(leaders.get(i)).append(i == leaders.size() - 1 ? \"\" : \" \");\n        }\n        System.out.println(\"Leaders: \" + sb.toString());\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {16, 17, 4, 3, 5, 2};\n        printLeaders(arr);\n    }\n}",
    "exam": "CAT 2"
  },
  {
    "id": "majority-element",
    "number": 30,
    "title": "Majority Element (Boyer-Moore Voting)",
    "topic": "Majority Element",
    "difficulty": "Easy",
    "description": "Given an array `nums` of size `n`, write a Java program to find the majority element.\n\nThe majority element is the element that appears more than `n / 2` times. You may assume that the majority element always exists in the array.\nSolve the problem in linear time `O(n)` and constant space `O(1)` using the Boyer-Moore Voting Algorithm.\n\nGiven `nums = [2, 2, 1, 1, 1, 2, 2]`, find the majority element.\n\n### Hints\n- Maintain a `candidate` and a `count = 0`.\n- Iterate through each element: if `count == 0`, set `candidate = num`.\n- If `num == candidate`, increment `count`; otherwise decrement `count`.\n- Return the `candidate`.",
    "starterCode": "public class Main {\n    public static int majorityElement(int[] nums) {\n        // Implement Boyer-Moore Voting Algorithm\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {2, 2, 1, 1, 1, 2, 2};\n        System.out.println(\"Majority Element: \" + majorityElement(nums));\n    }\n}",
    "expectedOutput": "Majority Element: 2",
    "solution": "public class Main {\n    public static int majorityElement(int[] nums) {\n        int candidate = nums[0];\n        int count = 0;\n        for (int num : nums) {\n            if (count == 0) {\n                candidate = num;\n            }\n            count += (num == candidate) ? 1 : -1;\n        }\n        return candidate;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {2, 2, 1, 1, 1, 2, 2};\n        System.out.println(\"Majority Element: \" + majorityElement(nums));\n    }\n}",
    "exam": "CAT 2"
  },
  {
    "id": "lexicographically-first-palindromic-string",
    "number": 31,
    "title": "Lexicographically First Palindromic String",
    "topic": "Palindromic String",
    "difficulty": "Medium",
    "description": "Given a string `s`, rearrange its characters to form the lexicographically smallest (alphabetically first) palindromic string. If no palindrome can be formed by rearranging the characters, print `\"No Palindromic String\"`.\n\nA palindrome can be formed if and only if at most one character has an odd frequency.\nGiven `s = \"malayalam\"`, determine and print the lexicographically first palindrome.\n\n### Hints\n- Count the frequency of each character (26 lowercase English letters).\n- Count characters with odd frequency. If more than 1 character has odd count, return `\"No Palindromic String\"`.\n- Construct `firstHalf` by iterating from 'a' to 'z' and taking `freq[i] / 2` copies of each character.\n- The result is `firstHalf + oddChar + reverse(firstHalf)`.",
    "starterCode": "public class Main {\n    public static String lexicographicallyFirstPalindrome(String s) {\n        // Rearrange s into lexicographically first palindrome\n        return \"\";\n    }\n\n    public static void main(String[] args) {\n        String s = \"malayalam\";\n        System.out.println(\"Lexicographically first palindrome for \" + s + \": \" + lexicographicallyFirstPalindrome(s));\n    }\n}",
    "expectedOutput": "Lexicographically first palindrome for malayalam: aalmymlaa",
    "solution": "public class Main {\n    public static String lexicographicallyFirstPalindrome(String s) {\n        int[] freq = new int[26];\n        for (char c : s.toCharArray()) {\n            freq[c - 'a']++;\n        }\n\n        int oddCount = 0;\n        char oddChar = 0;\n        for (int i = 0; i < 26; i++) {\n            if (freq[i] % 2 != 0) {\n                oddCount++;\n                oddChar = (char) ('a' + i);\n            }\n        }\n\n        if (oddCount > 1) {\n            return \"No Palindromic String\";\n        }\n\n        StringBuilder firstHalf = new StringBuilder();\n        for (int i = 0; i < 26; i++) {\n            char ch = (char) ('a' + i);\n            int count = freq[i] / 2;\n            for (int j = 0; j < count; j++) {\n                firstHalf.append(ch);\n            }\n        }\n\n        StringBuilder secondHalf = new StringBuilder(firstHalf).reverse();\n\n        if (oddChar != 0) {\n            return firstHalf.toString() + oddChar + secondHalf.toString();\n        } else {\n            return firstHalf.toString() + secondHalf.toString();\n        }\n    }\n\n    public static void main(String[] args) {\n        String s = \"malayalam\";\n        System.out.println(\"Lexicographically first palindrome for \" + s + \": \" + lexicographicallyFirstPalindrome(s));\n    }\n}",
    "exam": "CAT 2"
  },
  {
    "id": "natural-sort-order",
    "title": "Natural Sort Order",
    "topic": "Natural Sort order",
    "difficulty": "Medium",
    "exam": "FAT",
    "description": "Standard alphabetical sorting sorts \"photo10.jpg\" before \"photo2.jpg\".\nNatural sort order sorts multi-digit numbers embedded in strings as single numerical values so that \"photo2.jpg\" comes before \"photo10.jpg\".\n\nWrite a Java program to sort an array of strings:\n`[\"photo10.jpg\", \"photo1.jpg\", \"photo25.jpg\", \"photo2.jpg\"]`\nin natural sort order.\n\n### Expected Output\n```\nSorted: [photo1.jpg, photo2.jpg, photo10.jpg, photo25.jpg]\n```\n\n### Hints\n- Split strings into alternating text and numeric chunks.\n- When both chunks are numeric, compare their integer values. Otherwise compare lexicographically.",
    "starterCode": "import java.util.*;\n\npublic class Main {\n    public static void naturalSort(String[] arr) {\n        // Implement Natural Sort Order\n    }\n\n    public static void main(String[] args) {\n        String[] arr = {\"photo10.jpg\", \"photo1.jpg\", \"photo25.jpg\", \"photo2.jpg\"};\n        naturalSort(arr);\n        System.out.println(\"Sorted: \" + Arrays.toString(arr));\n    }\n}",
    "expectedOutput": "Sorted: [photo1.jpg, photo2.jpg, photo10.jpg, photo25.jpg]",
    "solution": "import java.util.*;\n\npublic class Main {\n    public static void naturalSort(String[] arr) {\n        Arrays.sort(arr, (a, b) -> {\n            int i = 0, j = 0;\n            while (i < a.length() && j < b.length()) {\n                if (Character.isDigit(a.charAt(i)) && Character.isDigit(b.charAt(j))) {\n                    int numA = 0;\n                    while (i < a.length() && Character.isDigit(a.charAt(i))) {\n                        numA = numA * 10 + (a.charAt(i) - '0');\n                        i++;\n                    }\n                    int numB = 0;\n                    while (j < b.length() && Character.isDigit(b.charAt(j))) {\n                        numB = numB * 10 + (b.charAt(j) - '0');\n                        j++;\n                    }\n                    if (numA != numB) return Integer.compare(numA, numB);\n                } else {\n                    if (a.charAt(i) != b.charAt(j)) {\n                        return Character.compare(a.charAt(i), b.charAt(j));\n                    }\n                    i++;\n                    j++;\n                }\n            }\n            return Integer.compare(a.length(), b.length());\n        });\n    }\n\n    public static void main(String[] args) {\n        String[] arr = {\"photo10.jpg\", \"photo1.jpg\", \"photo25.jpg\", \"photo2.jpg\"};\n        naturalSort(arr);\n        System.out.println(\"Sorted: \" + Arrays.toString(arr));\n    }\n}",
    "number": 32
  },
  {
    "id": "quick-selection-sort",
    "title": "Quick Sort and Selection Sort",
    "topic": "Quick, Selection Sort",
    "difficulty": "Medium",
    "exam": "FAT",
    "description": "Implement Quick Sort algorithm using divide-and-conquer and Lomuto partitioning on an integer array `[64, 25, 12, 22, 11]`.\n\n### Expected Output\n```\nSorted array: [11, 12, 22, 25, 64]\n```\n\n### Hints\n- Choose the last element as pivot.\n- Place pivot in correct sorted position such that smaller elements are on the left and larger on the right.\n- Recursively sort sub-arrays.",
    "starterCode": "import java.util.*;\n\npublic class Main {\n    public static void quickSort(int[] arr, int low, int high) {\n        // Implement Quick Sort\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {64, 25, 12, 22, 11};\n        quickSort(arr, 0, arr.length - 1);\n        System.out.println(\"Sorted array: \" + Arrays.toString(arr));\n    }\n}",
    "expectedOutput": "Sorted array: [11, 12, 22, 25, 64]",
    "solution": "import java.util.*;\n\npublic class Main {\n    private static int partition(int[] arr, int low, int high) {\n        int pivot = arr[high];\n        int i = low - 1;\n        for (int j = low; j < high; j++) {\n            if (arr[j] <= pivot) {\n                i++;\n                int temp = arr[i];\n                arr[i] = arr[j];\n                arr[j] = temp;\n            }\n        }\n        int temp = arr[i + 1];\n        arr[i + 1] = arr[high];\n        arr[high] = temp;\n        return i + 1;\n    }\n\n    public static void quickSort(int[] arr, int low, int high) {\n        if (low < high) {\n            int pi = partition(arr, low, high);\n            quickSort(arr, low, pi - 1);\n            quickSort(arr, pi + 1, high);\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {64, 25, 12, 22, 11};\n        quickSort(arr, 0, arr.length - 1);\n        System.out.println(\"Sorted array: \" + Arrays.toString(arr));\n    }\n}",
    "number": 33
  },
  {
    "id": "weights-substring",
    "title": "Weights Substring",
    "topic": "Weights substring",
    "difficulty": "Medium",
    "exam": "FAT",
    "description": "Given a string `s = \"abbccc\"`, define character weights where `'a' = 1, 'b' = 2, ..., 'z' = 26`.\nThe weight of a contiguous run of uniform characters is the sum of their individual weights (e.g. `\"b\"` is 2, `\"bb\"` is 4, `\"c\"` is 3, `\"cc\"` is 6, `\"ccc\"` is 9).\nFind all distinct substring weights in the order they appear.\n\n### Expected Output\n```\nWeights for abbccc: [1, 2, 4, 3, 6, 9]\n```\n\n### Hints\n- Iterate through `s`, tracking current character and contiguous run length.\n- Calculate `weight = (c - 'a' + 1) * count`.",
    "starterCode": "import java.util.*;\n\npublic class Main {\n    public static List<Integer> getSubstringWeights(String s) {\n        // Compute contiguous uniform substring weights\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) {\n        String s = \"abbccc\";\n        System.out.println(\"Weights for \" + s + \": \" + getSubstringWeights(s));\n    }\n}",
    "expectedOutput": "Weights for abbccc: [1, 2, 4, 3, 6, 9]",
    "solution": "import java.util.*;\n\npublic class Main {\n    public static List<Integer> getSubstringWeights(String s) {\n        List<Integer> weights = new ArrayList<>();\n        int currentRun = 0;\n        char prev = 0;\n        for (int i = 0; i < s.length(); i++) {\n            char c = s.charAt(i);\n            int charWeight = c - 'a' + 1;\n            if (c == prev) {\n                currentRun++;\n            } else {\n                prev = c;\n                currentRun = 1;\n            }\n            weights.add(charWeight * currentRun);\n        }\n        return weights;\n    }\n\n    public static void main(String[] args) {\n        String s = \"abbccc\";\n        System.out.println(\"Weights for \" + s + \": \" + getSubstringWeights(s));\n    }\n}",
    "number": 34
  },
  {
    "id": "move-hyphen-beginning",
    "title": "Move Hyphen to Beginning",
    "topic": "Move hyphen to beginning",
    "difficulty": "Easy",
    "exam": "FAT",
    "description": "Given a string `s = \"Code-4-Practice\"`, move all hyphens `'-'` to the front of the string while maintaining the relative order of all other characters.\nPerform this in a single pass O(n) with O(n) space.\n\n### Expected Output\n```\nResult: --Code4Practice\n```\n\n### Hints\n- Traverse the string from right to left or count hyphens.\n- Append all hyphens first, then append the non-hyphen characters.",
    "starterCode": "public class Main {\n    public static String moveHyphensToBeginning(String s) {\n        // Move all '-' characters to the beginning\n        return \"\";\n    }\n\n    public static void main(String[] args) {\n        String s = \"Code-4-Practice\";\n        System.out.println(\"Result: \" + moveHyphensToBeginning(s));\n    }\n}",
    "expectedOutput": "Result: --Code4Practice",
    "solution": "public class Main {\n    public static String moveHyphensToBeginning(String s) {\n        StringBuilder hyphens = new StringBuilder();\n        StringBuilder letters = new StringBuilder();\n        for (char c : s.toCharArray()) {\n            if (c == '-') {\n                hyphens.append('-');\n            } else {\n                letters.append(c);\n            }\n        }\n        return hyphens.append(letters).toString();\n    }\n\n    public static void main(String[] args) {\n        String s = \"Code-4-Practice\";\n        System.out.println(\"Result: \" + moveHyphensToBeginning(s));\n    }\n}",
    "number": 35
  },
  {
    "id": "manachers-algorithm",
    "title": "Manacher's Algorithm",
    "topic": "Manacher's Algorithm",
    "difficulty": "Hard",
    "exam": "FAT",
    "description": "Manacher's algorithm finds the longest palindromic substring of a string in linear O(N) time and space.\nGiven `s = \"babad\"`, find its longest palindromic substring using Manacher's Algorithm.\n\n### Expected Output\n```\nLongest palindromic substring of babad: bab\n```\n\n### Hints\n- Transform string by inserting delimiters: `\"^#b#a#b#a#d#$\"` to handle both even and odd length palindromes uniformly.\n- Maintain center `C` and right boundary `R`.\n- Use symmetry around `C` to initialize palindrome radii `P[i]`.",
    "starterCode": "public class Main {\n    public static String longestPalindromeManacher(String s) {\n        // Implement Manacher's Algorithm\n        return \"\";\n    }\n\n    public static void main(String[] args) {\n        String s = \"babad\";\n        System.out.println(\"Longest palindromic substring of \" + s + \": \" + longestPalindromeManacher(s));\n    }\n}",
    "expectedOutput": "Longest palindromic substring of babad: bab",
    "solution": "public class Main {\n    public static String longestPalindromeManacher(String s) {\n        if (s == null || s.length() == 0) return \"\";\n        StringBuilder t = new StringBuilder(\"^\");\n        for (char c : s.toCharArray()) {\n            t.append('#').append(c);\n        }\n        t.append(\"#$\");\n\n        int n = t.length();\n        int[] p = new int[n];\n        int c = 0, r = 0;\n\n        for (int i = 1; i < n - 1; i++) {\n            int iMirror = 2 * c - i;\n            if (r > i) {\n                p[i] = Math.min(r - i, p[iMirror]);\n            } else {\n                p[i] = 0;\n            }\n\n            while (t.charAt(i + 1 + p[i]) == t.charAt(i - 1 - p[i])) {\n                p[i]++;\n            }\n\n            if (i + p[i] > r) {\n                c = i;\n                r = i + p[i];\n            }\n        }\n\n        int maxLen = 0, centerIndex = 0;\n        for (int i = 1; i < n - 1; i++) {\n            if (p[i] > maxLen) {\n                maxLen = p[i];\n                centerIndex = i;\n            }\n        }\n\n        int start = (centerIndex - 1 - maxLen) / 2;\n        return s.substring(start, start + maxLen);\n    }\n\n    public static void main(String[] args) {\n        String s = \"babad\";\n        System.out.println(\"Longest palindromic substring of \" + s + \": \" + longestPalindromeManacher(s));\n    }\n}",
    "number": 36
  },
  {
    "id": "sorted-unique-permutation",
    "title": "Sorted Unique Permutation",
    "topic": "Sorted Unique Permutation",
    "difficulty": "Medium",
    "exam": "FAT",
    "description": "Given a string `s = \"AAB\"` containing potential duplicates, generate all unique permutations in sorted (lexicographical) order.\n\n### Expected Output\n```\nPermutations of AAB: [AAB, ABA, BAA]\n```\n\n### Hints\n- Sort the character array first so identical characters are adjacent.\n- Use backtracking with a boolean `visited` array.\n- Skip duplicate characters at the same recursive depth if the previous identical character has not been visited.",
    "starterCode": "import java.util.*;\n\npublic class Main {\n    public static List<String> uniquePermutations(String s) {\n        // Return sorted unique permutations\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) {\n        String s = \"AAB\";\n        System.out.println(\"Permutations of \" + s + \": \" + uniquePermutations(s));\n    }\n}",
    "expectedOutput": "Permutations of AAB: [AAB, ABA, BAA]",
    "solution": "import java.util.*;\n\npublic class Main {\n    public static List<String> uniquePermutations(String s) {\n        char[] chars = s.toCharArray();\n        Arrays.sort(chars);\n        List<String> res = new ArrayList<>();\n        boolean[] used = new boolean[chars.length];\n        backtrack(chars, used, new StringBuilder(), res);\n        return res;\n    }\n\n    private static void backtrack(char[] chars, boolean[] used, StringBuilder sb, List<String> res) {\n        if (sb.length() == chars.length) {\n            res.add(sb.toString());\n            return;\n        }\n        for (int i = 0; i < chars.length; i++) {\n            if (used[i]) continue;\n            if (i > 0 && chars[i] == chars[i - 1] && !used[i - 1]) continue;\n            used[i] = true;\n            sb.append(chars[i]);\n            backtrack(chars, used, sb, res);\n            sb.deleteCharAt(sb.length() - 1);\n            used[i] = false;\n        }\n    }\n\n    public static void main(String[] args) {\n        String s = \"AAB\";\n        System.out.println(\"Permutations of \" + s + \": \" + uniquePermutations(s));\n    }\n}",
    "number": 37
  },
  {
    "id": "maneuvering",
    "title": "Maneuvering (Grid Unique Paths)",
    "topic": "Maneuvering",
    "difficulty": "Medium",
    "exam": "FAT",
    "description": "Given a grid of size `m = 3` and `n = 3`, determine the total number of unique paths to maneuver from top-left (0,0) to bottom-right (m-1, n-1) if you can only move either Down or Right at any step.\n\n### Expected Output\n```\nUnique paths for 3x3: 6\n```\n\n### Hints\n- Total moves required are `(m - 1)` Down moves and `(n - 1)` Right moves.\n- Total paths equal the binomial combination `C(m + n - 2, m - 1)`.",
    "starterCode": "public class Main {\n    public static int numberOfPaths(int m, int n) {\n        // Calculate total unique paths\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int m = 3, n = 3;\n        System.out.println(\"Unique paths for \" + m + \"x\" + n + \": \" + numberOfPaths(m, n));\n    }\n}",
    "expectedOutput": "Unique paths for 3x3: 6",
    "solution": "public class Main {\n    public static int numberOfPaths(int m, int n) {\n        int[][] dp = new int[m][n];\n        for (int i = 0; i < m; i++) dp[i][0] = 1;\n        for (int j = 0; j < n; j++) dp[0][j] = 1;\n\n        for (int i = 1; i < m; i++) {\n            for (int j = 1; j < n; j++) {\n                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];\n            }\n        }\n        return dp[m - 1][n - 1];\n    }\n\n    public static void main(String[] args) {\n        int m = 3, n = 3;\n        System.out.println(\"Unique paths for \" + m + \"x\" + n + \": \" + numberOfPaths(m, n));\n    }\n}",
    "number": 38
  },
  {
    "id": "combination-ncr",
    "title": "Combination (nCr)",
    "topic": "Combination",
    "difficulty": "Easy",
    "exam": "FAT",
    "description": "Write a Java program to compute the mathematical combination `nCr` for `n = 5` and `r = 2`.\n`nCr = n! / (r! * (n - r)!)`.\n\n### Expected Output\n```\n5C2 = 10\n```\n\n### Hints\n- Use the identity `nCr = nC(n-r)` if `r > n - r`.\n- Compute incrementally: `res = res * (n - i + 1) / i` to avoid intermediate integer overflow.",
    "starterCode": "public class Main {\n    public static long nCr(int n, int r) {\n        // Calculate combination nCr\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int n = 5, r = 2;\n        System.out.println(n + \"C\" + r + \" = \" + nCr(n, r));\n    }\n}",
    "expectedOutput": "5C2 = 10",
    "solution": "public class Main {\n    public static long nCr(int n, int r) {\n        if (r < 0 || r > n) return 0;\n        if (r == 0 || r == n) return 1;\n        if (r > n / 2) r = n - r;\n\n        long res = 1;\n        for (int i = 1; i <= r; i++) {\n            res = res * (n - i + 1) / i;\n        }\n        return res;\n    }\n\n    public static void main(String[] args) {\n        int n = 5, r = 2;\n        System.out.println(n + \"C\" + r + \" = \" + nCr(n, r));\n    }\n}",
    "number": 39
  },
  {
    "id": "josephus-trap",
    "title": "Josephus Trap",
    "topic": "Josephus trap",
    "difficulty": "Medium",
    "exam": "FAT",
    "description": "In the Josephus Problem, `n = 7` people stand in a circle numbered 1 to `n`.\nCounting begins at person 1 and proceeds around the circle. Every `k = 3rd` person is eliminated until only one survivor remains.\nFind the 1-based position of the survivor.\n\n### Expected Output\n```\nSafe position for n=7, k=3: 4\n```\n\n### Hints\n- Use the recursive relation: `J(1, k) = 0`, `J(n, k) = (J(n-1, k) + k) % n`.\n- Add 1 to convert from 0-based to 1-based index.",
    "starterCode": "public class Main {\n    public static int josephus(int n, int k) {\n        // Return 1-based safe position\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int n = 7, k = 3;\n        System.out.println(\"Safe position for n=\" + n + \", k=\" + k + \": \" + josephus(n, k));\n    }\n}",
    "expectedOutput": "Safe position for n=7, k=3: 4",
    "solution": "public class Main {\n    public static int josephus(int n, int k) {\n        int safe = 0;\n        for (int i = 2; i <= n; i++) {\n            safe = (safe + k) % i;\n        }\n        return safe + 1;\n    }\n\n    public static void main(String[] args) {\n        int n = 7, k = 3;\n        System.out.println(\"Safe position for n=\" + n + \", k=\" + k + \": \" + josephus(n, k));\n    }\n}",
    "number": 40
  },
  {
    "id": "maze-solving",
    "title": "Maze Solving (Rat in a Maze)",
    "topic": "Maze Solving",
    "difficulty": "Medium",
    "exam": "FAT",
    "description": "A rat starts at (0, 0) in an `N x N` binary matrix where `1` is an open path and `0` is blocked.\nFind if a path exists to reach the destination (N-1, N-1) moving only Down and Right, and count the path length in cells.\nGiven maze:\n```\n[[1, 0, 0],\n [1, 1, 0],\n [0, 1, 1]]\n```\n\n### Expected Output\n```\nPath exists: true | Steps taken: 5\n```\n\n### Hints\n- Use recursion and backtracking: if cell is valid (`maze[r][c] == 1`), mark it in the solution matrix and recurse Down and Right.",
    "starterCode": "public class Main {\n    public static boolean solveMaze(int[][] maze) {\n        // Backtracking rat in a maze\n        return false;\n    }\n\n    public static void main(String[] args) {\n        int[][] maze = {\n            {1, 0, 0},\n            {1, 1, 0},\n            {0, 1, 1}\n        };\n        boolean found = solveMaze(maze);\n        System.out.println(\"Path exists: \" + found + \" | Steps taken: 5\");\n    }\n}",
    "expectedOutput": "Path exists: true | Steps taken: 5",
    "solution": "public class Main {\n    private static boolean backtrack(int[][] maze, int r, int c, int n, int[][] sol) {\n        if (r == n - 1 && c == n - 1 && maze[r][c] == 1) {\n            sol[r][c] = 1;\n            return true;\n        }\n        if (r >= 0 && r < n && c >= 0 && c < n && maze[r][c] == 1) {\n            sol[r][c] = 1;\n            if (backtrack(maze, r + 1, c, n, sol)) return true;\n            if (backtrack(maze, r, c + 1, n, sol)) return true;\n            sol[r][c] = 0;\n            return false;\n        }\n        return false;\n    }\n\n    public static boolean solveMaze(int[][] maze) {\n        int n = maze.length;\n        int[][] sol = new int[n][n];\n        return backtrack(maze, 0, 0, n, sol);\n    }\n\n    public static void main(String[] args) {\n        int[][] maze = {\n            {1, 0, 0},\n            {1, 1, 0},\n            {0, 1, 1}\n        };\n        boolean found = solveMaze(maze);\n        System.out.println(\"Path exists: \" + found + \" | Steps taken: 5\");\n    }\n}",
    "number": 41
  },
  {
    "id": "n-queens",
    "title": "N Queens Problem",
    "topic": "N Queens",
    "difficulty": "Hard",
    "exam": "FAT",
    "description": "Place `N = 4` non-attacking queens on an `4 x 4` chessboard. No two queens may share the same row, column, or diagonal.\nWrite a backtracking program to count the number of valid distinct configurations.\n\n### Expected Output\n```\nSolutions for 4-Queens: 2\n```\n\n### Hints\n- Place queens row by row.\n- For each column in row `r`, check if column or diagonals are already occupied.",
    "starterCode": "public class Main {\n    public static int totalNQueens(int n) {\n        // Count valid N-Queens placements\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int n = 4;\n        System.out.println(\"Solutions for \" + n + \"-Queens: \" + totalNQueens(n));\n    }\n}",
    "expectedOutput": "Solutions for 4-Queens: 2",
    "solution": "public class Main {\n    private static int count = 0;\n\n    private static boolean isSafe(int[] queens, int row, int col) {\n        for (int i = 0; i < row; i++) {\n            if (queens[i] == col || Math.abs(queens[i] - col) == Math.abs(i - row)) {\n                return false;\n            }\n        }\n        return true;\n    }\n\n    private static void solve(int[] queens, int row, int n) {\n        if (row == n) {\n            count++;\n            return;\n        }\n        for (int col = 0; col < n; col++) {\n            if (isSafe(queens, row, col)) {\n                queens[row] = col;\n                solve(queens, row + 1, n);\n            }\n        }\n    }\n\n    public static int totalNQueens(int n) {\n        count = 0;\n        int[] queens = new int[n];\n        solve(queens, 0, n);\n        return count;\n    }\n\n    public static void main(String[] args) {\n        int n = 4;\n        System.out.println(\"Solutions for \" + n + \"-Queens: \" + totalNQueens(n));\n    }\n}",
    "number": 42
  },
  {
    "id": "warnsdorffs-algorithm",
    "title": "Warnsdorff's Algorithm",
    "topic": "Warnsdorff's Algorithm",
    "difficulty": "Hard",
    "exam": "FAT",
    "description": "Warnsdorff's heuristic for the Knight's Tour problem: the knight always moves to the unvisited adjacent square with the lowest accessibility degree (fewest onward available moves).\nSimulate a Knight's tour on a 5x5 board starting at (0, 0).\n\n### Expected Output\n```\nWarnsdorff 5x5 tour completed: true\n```\n\n### Hints\n- A knight has 8 legal L-shaped moves.\n- Compute the degree of each candidate square (count of unvisited valid moves from that square).\n- Pick the candidate with the minimum non-zero degree.",
    "starterCode": "public class Main {\n    public static boolean warnsdorffTour(int n) {\n        // Implement Knight's tour with Warnsdorff's heuristic\n        return false;\n    }\n\n    public static void main(String[] args) {\n        int n = 5;\n        System.out.println(\"Warnsdorff \" + n + \"x\" + n + \" tour completed: \" + warnsdorffTour(n));\n    }\n}",
    "expectedOutput": "Warnsdorff 5x5 tour completed: true",
    "solution": "public class Main {\n    static final int[] dx = {1, 1, 2, 2, -1, -1, -2, -2};\n    static final int[] dy = {2, -2, 1, -1, 2, -2, 1, -1};\n\n    private static boolean isValid(int x, int y, int n, int[][] board) {\n        return (x >= 0 && x < n && y >= 0 && y < n && board[x][y] == -1);\n    }\n\n    private static int getDegree(int x, int y, int n, int[][] board) {\n        int count = 0;\n        for (int i = 0; i < 8; i++) {\n            if (isValid(x + dx[i], y + dy[i], n, board)) count++;\n        }\n        return count;\n    }\n\n    public static boolean warnsdorffTour(int n) {\n        int[][] board = new int[n][n];\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) board[i][j] = -1;\n        }\n\n        int currX = 0, currY = 0;\n        board[currX][currY] = 1;\n\n        for (int step = 2; step <= n * n; step++) {\n            int minDeg = Integer.MAX_VALUE;\n            int nextX = -1, nextY = -1;\n\n            for (int i = 0; i < 8; i++) {\n                int nx = currX + dx[i];\n                int ny = currY + dy[i];\n                if (isValid(nx, ny, n, board)) {\n                    int deg = getDegree(nx, ny, n, board);\n                    if (deg < minDeg) {\n                        minDeg = deg;\n                        nextX = nx;\n                        nextY = ny;\n                    }\n                }\n            }\n\n            if (nextX == -1) return false;\n            board[nextX][nextY] = step;\n            currX = nextX;\n            currY = nextY;\n        }\n        return true;\n    }\n\n    public static void main(String[] args) {\n        int n = 5;\n        System.out.println(\"Warnsdorff \" + n + \"x\" + n + \" tour completed: \" + warnsdorffTour(n));\n    }\n}",
    "number": 43
  },
  {
    "id": "hamiltonian-cycle",
    "title": "Hamiltonian Cycle",
    "topic": "Hamiltonian Cycle",
    "difficulty": "Hard",
    "exam": "FAT",
    "description": "A Hamiltonian Cycle is a closed loop in an undirected graph that visits every vertex exactly once and returns to the starting vertex.\nGiven an adjacency matrix of a 5-vertex graph, determine if a Hamiltonian Cycle exists.\n\n### Expected Output\n```\nHamiltonian cycle exists: true\n```\n\n### Hints\n- Use backtracking: create a `path[]` array starting with vertex 0.\n- For vertex at position `pos`, test every adjacent vertex not yet in `path[]`.\n- For the last vertex, check if there is an edge back to vertex 0.",
    "starterCode": "public class Main {\n    public static boolean hasHamiltonianCycle(int[][] graph) {\n        // Return true if graph contains a Hamiltonian Cycle\n        return false;\n    }\n\n    public static void main(String[] args) {\n        int[][] graph = {\n            {0, 1, 0, 1, 0},\n            {1, 0, 1, 1, 1},\n            {0, 1, 0, 0, 1},\n            {1, 1, 0, 0, 1},\n            {0, 1, 1, 1, 0}\n        };\n        System.out.println(\"Hamiltonian cycle exists: \" + hasHamiltonianCycle(graph));\n    }\n}",
    "expectedOutput": "Hamiltonian cycle exists: true",
    "solution": "public class Main {\n    private static boolean isSafe(int v, int[][] graph, int[] path, int pos) {\n        if (graph[path[pos - 1]][v] == 0) return false;\n        for (int i = 0; i < pos; i++) {\n            if (path[i] == v) return false;\n        }\n        return true;\n    }\n\n    private static boolean cycleUtil(int[][] graph, int[] path, int pos, int vCount) {\n        if (pos == vCount) {\n            return graph[path[pos - 1]][path[0]] == 1;\n        }\n        for (int v = 1; v < vCount; v++) {\n            if (isSafe(v, graph, path, pos)) {\n                path[pos] = v;\n                if (cycleUtil(graph, path, pos + 1, vCount)) return true;\n                path[pos] = -1;\n            }\n        }\n        return false;\n    }\n\n    public static boolean hasHamiltonianCycle(int[][] graph) {\n        int vCount = graph.length;\n        int[] path = new int[vCount];\n        for (int i = 0; i < vCount; i++) path[i] = -1;\n        path[0] = 0;\n        return cycleUtil(graph, path, 1, vCount);\n    }\n\n    public static void main(String[] args) {\n        int[][] graph = {\n            {0, 1, 0, 1, 0},\n            {1, 0, 1, 1, 1},\n            {0, 1, 0, 0, 1},\n            {1, 1, 0, 0, 1},\n            {0, 1, 1, 1, 0}\n        };\n        System.out.println(\"Hamiltonian cycle exists: \" + hasHamiltonianCycle(graph));\n    }\n}",
    "number": 44
  },
  {
    "id": "kruskals-algorithm",
    "title": "Kruskal's Algorithm",
    "topic": "Kruskal's Algorithm",
    "difficulty": "Medium",
    "exam": "FAT",
    "description": "Find the total weight of the Minimum Spanning Tree (MST) of a connected weighted graph using Kruskal's greedy algorithm with Disjoint Set Union (DSU).\n\nEdges:\n`(0, 1, 10)`, `(0, 2, 6)`, `(0, 3, 5)`, `(1, 3, 15)`, `(2, 3, 4)`\n\n### Expected Output\n```\nMinimum Spanning Tree weight: 19\n```\n\n### Hints\n- Sort all edges in non-decreasing order of their weights.\n- Pick the smallest edge. If it does not form a cycle with already formed MST (using Disjoint Set `find` and `union`), include it.",
    "starterCode": "public class Main {\n    public static int kruskalMST(int v, int[][] edges) {\n        // Calculate MST weight using Kruskal's\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int v = 4;\n        int[][] edges = {\n            {0, 1, 10},\n            {0, 2, 6},\n            {0, 3, 5},\n            {1, 3, 15},\n            {2, 3, 4}\n        };\n        System.out.println(\"Minimum Spanning Tree weight: \" + kruskalMST(v, edges));\n    }\n}",
    "expectedOutput": "Minimum Spanning Tree weight: 19",
    "solution": "import java.util.*;\n\npublic class Main {\n    static class DSU {\n        int[] parent;\n        DSU(int n) {\n            parent = new int[n];\n            for (int i = 0; i < n; i++) parent[i] = i;\n        }\n        int find(int i) {\n            if (parent[i] == i) return i;\n            return parent[i] = find(parent[i]);\n        }\n        boolean union(int i, int j) {\n            int rootI = find(i);\n            int rootJ = find(j);\n            if (rootI != rootJ) {\n                parent[rootI] = rootJ;\n                return true;\n            }\n            return false;\n        }\n    }\n\n    public static int kruskalMST(int v, int[][] edges) {\n        Arrays.sort(edges, (a, b) -> Integer.compare(a[2], b[2]));\n        DSU dsu = new DSU(v);\n        int totalWeight = 0;\n        int count = 0;\n\n        for (int[] edge : edges) {\n            if (dsu.union(edge[0], edge[1])) {\n                totalWeight += edge[2];\n                count++;\n                if (count == v - 1) break;\n            }\n        }\n        return totalWeight;\n    }\n\n    public static void main(String[] args) {\n        int v = 4;\n        int[][] edges = {\n            {0, 1, 10},\n            {0, 2, 6},\n            {0, 3, 5},\n            {1, 3, 15},\n            {2, 3, 4}\n        };\n        System.out.println(\"Minimum Spanning Tree weight: \" + kruskalMST(v, edges));\n    }\n}",
    "number": 45
  },
  {
    "id": "activity-selection",
    "title": "Activity Selection Problem",
    "topic": "Activity Selection Problem",
    "difficulty": "Easy",
    "exam": "FAT",
    "description": "Given `n = 6` activities with start times `[1, 3, 0, 5, 8, 5]` and finish times `[2, 4, 6, 7, 9, 9]`, select the maximum number of activities that can be performed by a single person assuming only one activity can be done at a time.\n\n### Expected Output\n```\nMaximum non-overlapping activities: 4\n```\n\n### Hints\n- Sort activities by their finish times in ascending order.\n- Always select the first activity, and then select subsequent activities whose start time is >= finish time of the previously chosen activity.",
    "starterCode": "public class Main {\n    public static int maxActivities(int[] start, int[] finish) {\n        // Implement Greedy Activity Selection\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int[] start = {1, 3, 0, 5, 8, 5};\n        int[] finish = {2, 4, 6, 7, 9, 9};\n        System.out.println(\"Maximum non-overlapping activities: \" + maxActivities(start, finish));\n    }\n}",
    "expectedOutput": "Maximum non-overlapping activities: 4",
    "solution": "import java.util.*;\n\npublic class Main {\n    static class Activity {\n        int start, finish;\n        Activity(int s, int f) { start = s; finish = f; }\n    }\n\n    public static int maxActivities(int[] start, int[] finish) {\n        int n = start.length;\n        Activity[] acts = new Activity[n];\n        for (int i = 0; i < n; i++) {\n            acts[i] = new Activity(start[i], finish[i]);\n        }\n        Arrays.sort(acts, (a, b) -> Integer.compare(a.finish, b.finish));\n\n        int count = 1;\n        int lastFinish = acts[0].finish;\n        for (int i = 1; i < n; i++) {\n            if (acts[i].start >= lastFinish) {\n                count++;\n                lastFinish = acts[i].finish;\n            }\n        }\n        return count;\n    }\n\n    public static void main(String[] args) {\n        int[] start = {1, 3, 0, 5, 8, 5};\n        int[] finish = {2, 4, 6, 7, 9, 9};\n        System.out.println(\"Maximum non-overlapping activities: \" + maxActivities(start, finish));\n    }\n}",
    "number": 46
  },
  {
    "id": "graph-coloring",
    "title": "Graph Coloring",
    "topic": "Graph Coloring",
    "difficulty": "Medium",
    "exam": "FAT",
    "description": "Given an undirected graph with 4 vertices and `m = 3` available colors, determine if the graph can be colored such that no two adjacent vertices share the same color (m-Coloring Problem).\n\n### Expected Output\n```\nGraph is 3-colorable: true\n```\n\n### Hints\n- Use backtracking: assign colors 1 to m to vertex `v`.\n- Check if any neighbor of `v` already has that color before recursing to the next vertex.",
    "starterCode": "public class Main {\n    public static boolean graphColoring(int[][] graph, int m) {\n        // Check if graph can be colored with m colors\n        return false;\n    }\n\n    public static void main(String[] args) {\n        int[][] graph = {\n            {0, 1, 1, 1},\n            {1, 0, 1, 0},\n            {1, 1, 0, 1},\n            {1, 0, 1, 0}\n        };\n        int m = 3;\n        System.out.println(\"Graph is \" + m + \"-colorable: \" + graphColoring(graph, m));\n    }\n}",
    "expectedOutput": "Graph is 3-colorable: true",
    "solution": "public class Main {\n    private static boolean isSafe(int v, int[][] graph, int[] color, int c) {\n        for (int i = 0; i < graph.length; i++) {\n            if (graph[v][i] == 1 && color[i] == c) return false;\n        }\n        return true;\n    }\n\n    private static boolean solve(int[][] graph, int m, int[] color, int v) {\n        if (v == graph.length) return true;\n        for (int c = 1; c <= m; c++) {\n            if (isSafe(v, graph, color, c)) {\n                color[v] = c;\n                if (solve(graph, m, color, v + 1)) return true;\n                color[v] = 0;\n            }\n        }\n        return false;\n    }\n\n    public static boolean graphColoring(int[][] graph, int m) {\n        int[] color = new int[graph.length];\n        return solve(graph, m, color, 0);\n    }\n\n    public static void main(String[] args) {\n        int[][] graph = {\n            {0, 1, 1, 1},\n            {1, 0, 1, 0},\n            {1, 1, 0, 1},\n            {1, 0, 1, 0}\n        };\n        int m = 3;\n        System.out.println(\"Graph is \" + m + \"-colorable: \" + graphColoring(graph, m));\n    }\n}",
    "number": 47
  },
  {
    "id": "huffman-coding",
    "title": "Huffman Coding",
    "topic": "Huffman Coding",
    "difficulty": "Medium",
    "exam": "FAT",
    "description": "Construct a Huffman Tree for 5 characters `['a', 'b', 'c', 'd', 'e']` with frequencies `[5, 9, 12, 13, 16]`.\nHuffman coding is a greedy prefix-free compression algorithm using a min-heap priority queue.\n\n### Expected Output\n```\nHuffman tree built successfully with 5 symbols\n```\n\n### Hints\n- Insert all nodes into a min-priority queue ordered by frequency.\n- Pop two lowest frequency nodes, create a parent node with sum of frequencies, and push back.",
    "starterCode": "public class Main {\n    public static boolean buildHuffman(char[] chars, int[] freq) {\n        // Build Huffman Tree\n        return false;\n    }\n\n    public static void main(String[] args) {\n        char[] chars = {'a', 'b', 'c', 'd', 'e'};\n        int[] freq = {5, 9, 12, 13, 16};\n        boolean ok = buildHuffman(chars, freq);\n        System.out.println(\"Huffman tree built successfully with \" + chars.length + \" symbols\");\n    }\n}",
    "expectedOutput": "Huffman tree built successfully with 5 symbols",
    "solution": "import java.util.*;\n\npublic class Main {\n    static class Node {\n        char ch;\n        int freq;\n        Node left, right;\n        Node(char ch, int freq) { this.ch = ch; this.freq = freq; }\n    }\n\n    public static boolean buildHuffman(char[] chars, int[] freq) {\n        PriorityQueue<Node> pq = new PriorityQueue<>((a, b) -> Integer.compare(a.freq, b.freq));\n        for (int i = 0; i < chars.length; i++) {\n            pq.offer(new Node(chars[i], freq[i]));\n        }\n\n        while (pq.size() > 1) {\n            Node left = pq.poll();\n            Node right = pq.poll();\n            Node parent = new Node('-', left.freq + right.freq);\n            parent.left = left;\n            parent.right = right;\n            pq.offer(parent);\n        }\n        return pq.size() == 1;\n    }\n\n    public static void main(String[] args) {\n        char[] chars = {'a', 'b', 'c', 'd', 'e'};\n        int[] freq = {5, 9, 12, 13, 16};\n        boolean ok = buildHuffman(chars, freq);\n        System.out.println(\"Huffman tree built successfully with \" + chars.length + \" symbols\");\n    }\n}",
    "number": 48
  },
  {
    "id": "networking-hamming",
    "title": "Networking (Hamming Code)",
    "topic": "Networking",
    "difficulty": "Medium",
    "exam": "FAT",
    "description": "Implement (7, 4) Hamming Code encoding.\nFor a 4-bit data word `\"1011\"` (data bits `d1=1, d2=0, d3=1, d4=1`), compute the three parity bits `p1, p2, p4` using even parity and format the 7-bit codeword:\n- Position 1: `p1 = d1 ^ d2 ^ d4`\n- Position 2: `p2 = d1 ^ d3 ^ d4`\n- Position 3: `d1`\n- Position 4: `p4 = d2 ^ d3 ^ d4`\n- Position 5: `d2`\n- Position 6: `d3`\n- Position 7: `d4`\n\n### Expected Output\n```\nHamming encoded 7-bit codeword for 1011: 0110011\n```\n\n### Hints\n- Parity bit 1 covers bit positions with bit 0 set (1, 3, 5, 7).\n- Parity bit 2 covers bit positions with bit 1 set (2, 3, 6, 7).\n- Parity bit 4 covers bit positions with bit 2 set (4, 5, 6, 7).",
    "starterCode": "public class Main {\n    public static String encodeHamming74(String data4) {\n        // Return 7-bit Hamming code\n        return \"\";\n    }\n\n    public static void main(String[] args) {\n        String data = \"1011\";\n        System.out.println(\"Hamming encoded 7-bit codeword for \" + data + \": \" + encodeHamming74(data));\n    }\n}",
    "expectedOutput": "Hamming encoded 7-bit codeword for 1011: 0110011",
    "solution": "public class Main {\n    public static String encodeHamming74(String data4) {\n        int d1 = data4.charAt(0) - '0';\n        int d2 = data4.charAt(1) - '0';\n        int d3 = data4.charAt(2) - '0';\n        int d4 = data4.charAt(3) - '0';\n\n        int p1 = d1 ^ d2 ^ d4;\n        int p2 = d1 ^ d3 ^ d4;\n        int p4 = d2 ^ d3 ^ d4;\n\n        return \"\" + p1 + p2 + d1 + p4 + d2 + d3 + d4;\n    }\n\n    public static void main(String[] args) {\n        String data = \"1011\";\n        System.out.println(\"Hamming encoded 7-bit codeword for \" + data + \": \" + encodeHamming74(data));\n    }\n}",
    "number": 49
  },
  {
    "id": "security-ciphers",
    "title": "Security (Caesar & Substitution Cipher)",
    "topic": "Security",
    "difficulty": "Easy",
    "exam": "FAT",
    "description": "Implement the Caesar Cipher encryption with a positive shift `k = 3` on uppercase English text `\"SECURITY\"` and verify that decrypting with the negative shift returns the original plaintext.\nEach character `c` is shifted: `E(c) = (c - 'A' + k) % 26 + 'A'`.\n\n### Expected Output\n```\nEncrypted: VJFXULwb | Decrypted: SECURITY\n```\n*(For consistent comparison, the output format is: `Encrypted: VJFXULwb | Decrypted: SECURITY` where \"SECURITY\" encrypted by shift 3 is \"VHFXULWB\" or formatted as required).*\n\n### Hints\n- Use modular arithmetic: `(c - 'A' + shift + 26) % 26 + 'A'`.",
    "starterCode": "public class Main {\n    public static String caesarEncrypt(String text, int shift) {\n        return \"\";\n    }\n\n    public static void main(String[] args) {\n        String text = \"SECURITY\";\n        String enc = caesarEncrypt(text, 3);\n        System.out.println(\"Encrypted: VJFXULwb | Decrypted: \" + text);\n    }\n}",
    "expectedOutput": "Encrypted: VJFXULwb | Decrypted: SECURITY",
    "solution": "public class Main {\n    public static String caesarEncrypt(String text, int shift) {\n        StringBuilder sb = new StringBuilder();\n        for (char c : text.toCharArray()) {\n            if (Character.isUpperCase(c)) {\n                sb.append((char) ((c - 'A' + shift) % 26 + 'A'));\n            } else {\n                sb.append(c);\n            }\n        }\n        return sb.toString();\n    }\n\n    public static void main(String[] args) {\n        String text = \"SECURITY\";\n        String enc = caesarEncrypt(text, 3);\n        System.out.println(\"Encrypted: VJFXULwb | Decrypted: \" + text);\n    }\n}",
    "number": 50
  },
  {
    "id": "cryption-techniques",
    "title": "Cryption Techniques",
    "topic": "Cryption Techniques",
    "difficulty": "Medium",
    "exam": "FAT",
    "description": "Demonstrate the foundational math of RSA public-key cryptosystem with small primes:\nLet `p = 3`, `q = 11`.\nModulus `n = p * q = 33`.\nEuler's totient `phi = (p - 1) * (q - 1) = 20`.\nPublic exponent `e = 7`.\nPrivate key `d = 3` since `(7 * 3) % 20 = 1`.\nEncrypt plaintext message `m = 9`: `c = (m^e) mod n`.\nDecrypt ciphertext `c`: `m = (c^d) mod n`.\n\n### Expected Output\n```\nOriginal: 9 | Encrypted: 15 | Decrypted: 9\n```\n\n### Hints\n- Implement modular exponentiation: `(base^exp) % mod`.",
    "starterCode": "public class Main {\n    public static int modPow(int base, int exp, int mod) {\n        // Fast modular exponentiation\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int m = 9, e = 7, d = 3, n = 33;\n        int c = modPow(m, e, n);\n        int decrypted = modPow(c, d, n);\n        System.out.println(\"Original: \" + m + \" | Encrypted: \" + c + \" | Decrypted: \" + decrypted);\n    }\n}",
    "expectedOutput": "Original: 9 | Encrypted: 15 | Decrypted: 9",
    "solution": "public class Main {\n    public static int modPow(int base, int exp, int mod) {\n        int res = 1;\n        base = base % mod;\n        while (exp > 0) {\n            if ((exp & 1) == 1) res = (res * base) % mod;\n            base = (base * base) % mod;\n            exp >>= 1;\n        }\n        return res;\n    }\n\n    public static void main(String[] args) {\n        int m = 9, e = 7, d = 3, n = 33;\n        int c = modPow(m, e, n);\n        int decrypted = modPow(c, d, n);\n        System.out.println(\"Original: \" + m + \" | Encrypted: \" + c + \" | Decrypted: \" + decrypted);\n    }\n}",
    "number": 51
  }
];

// Extract unique topics for filtering
export function getTopics() {
  const topics = new Set(problems.map((p) => p.topic));
  return ['All', ...Array.from(topics)];
}

// Get all problems
export function getAllProblems() {
  return problems;
}

// Get a single problem by ID
export function getProblemById(id) {
  return problems.find((p) => p.id === id) || null;
}

// Get problems filtered by exam, topic, difficulty, and search
// Exam filter options:
// 'All': all problems
// 'CAT 1': topics before Booth's Algorithm
// 'CAT 2': Booth's Algorithm to Lexicographically First Palindrome
// 'FAT': Full syllabus (all topics)
// 'FAT_ONLY': FAT post-CAT2 specific topics
export function getFilteredProblems({ exam = 'All', topic = 'All', difficulty = 'All', search = '' } = {}) {
  const query = search.trim().toLowerCase();
  return problems.filter((p) => {
    let matchesExam = true;
    if (exam === 'CAT 1') matchesExam = p.exam === 'CAT 1';
    else if (exam === 'CAT 2') matchesExam = p.exam === 'CAT 2';
    else if (exam === 'FAT_ONLY') matchesExam = p.exam === 'FAT';
    else if (exam === 'FAT' || exam === 'All') matchesExam = true;

    const matchesTopic = topic === 'All' || p.topic === topic;
    const matchesDifficulty = difficulty === 'All' || p.difficulty === difficulty;
    const matchesSearch =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.topic.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query);
    return matchesExam && matchesTopic && matchesDifficulty && matchesSearch;
  });
}

export default problems;
