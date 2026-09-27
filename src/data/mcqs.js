// 50 Curated Multiple Choice Questions for STS Exam
// Covering the entire syllabus: CAT 1, CAT 2, and FAT

export const mcqs = [
  // ==========================================
  // CAT 1: Before Booth's Algorithm (Q1 - Q18)
  // ==========================================
  {
    id: 1,
    exam: 'CAT 1',
    topic: 'Simple Sieve',
    question: 'What is the overall time complexity of the Sieve of Eratosthenes to generate all prime numbers up to N?',
    options: [
      'O(N)',
      'O(N log N)',
      'O(N log(log N))',
      'O(N^2)'
    ],
    correctIndex: 2,
    explanation: 'The Sieve of Eratosthenes marks multiples of primes. The inner loop executes N/2 + N/3 + N/5 + ... = N * sum(1/p). The sum of reciprocals of primes converges to log(log N), giving O(N log(log N)).'
  },
  {
    id: 2,
    exam: 'CAT 1',
    topic: 'Simple Sieve',
    question: 'In the Sieve of Eratosthenes, when marking composite numbers for a prime p, at which value can we start marking multiples of p?',
    options: [
      '2 * p',
      'p * p',
      'p + 1',
      'p^3'
    ],
    correctIndex: 1,
    explanation: 'Any multiple k * p where k < p will have already been marked by a prime smaller than p. Thus, we can safely optimize the inner loop to start at p * p.'
  },
  {
    id: 3,
    exam: 'CAT 1',
    topic: 'Segmented Sieve',
    question: 'Why is the Segmented Sieve preferred over the Simple Sieve when finding primes in a large range [L, R] where R <= 10^12 and (R - L) <= 10^6?',
    options: [
      'Segmented Sieve operates in O(1) time',
      'It drastically reduces auxiliary space to O(R - L + sqrt(R))',
      'Simple Sieve cannot find prime numbers larger than 100',
      'Segmented Sieve does not require trial division'
    ],
    correctIndex: 1,
    explanation: 'A Simple Sieve for R = 10^12 would require an array of size 10^12 bytes (~1 TB RAM), which causes memory exhaustion. Segmented Sieve only stores primes up to sqrt(R) and a boolean array of size (R - L + 1).'
  },
  {
    id: 4,
    exam: 'CAT 1',
    topic: 'Segmented Sieve',
    question: 'In a Segmented Sieve for range [L, R], what is the minimum value up to which simple primes must be precomputed?',
    options: [
      'L / 2',
      'R / 2',
      'floor(sqrt(R))',
      'R - L'
    ],
    correctIndex: 2,
    explanation: 'Any composite number in [L, R] must have at least one prime factor less than or equal to sqrt(R). Therefore, precomputing primes up to sqrt(R) is sufficient.'
  },
  {
    id: 5,
    exam: 'CAT 1',
    topic: "Euler's phi Algorithm",
    question: "What is Euler's Totient function phi(n) defined as?",
    options: [
      'The number of divisors of n',
      'The sum of all prime factors of n',
      'The count of integers k from 1 to n such that gcd(k, n) = 1',
      'The largest prime divisor of n'
    ],
    correctIndex: 2,
    explanation: "Euler's Totient function phi(n) counts positive integers up to n that are relatively prime (coprime) to n, meaning their greatest common divisor with n is 1."
  },
  {
    id: 6,
    exam: 'CAT 1',
    topic: "Euler's phi Algorithm",
    question: "What is the value of Euler's totient phi(21)?",
    options: [
      '10',
      '12',
      '14',
      '16'
    ],
    correctIndex: 1,
    explanation: 'Prime factors of 21 are 3 and 7. Using Euler product formula: phi(21) = 21 * (1 - 1/3) * (1 - 1/7) = 21 * (2/3) * (6/7) = 12.'
  },
  {
    id: 7,
    exam: 'CAT 1',
    topic: "Euler's phi Algorithm",
    question: 'For a prime number p, what is the value of phi(p)?',
    options: [
      'p',
      'p - 1',
      '1',
      'p / 2'
    ],
    correctIndex: 1,
    explanation: 'Since p is prime, every integer from 1 to p - 1 is coprime to p. Thus, phi(p) = p - 1.'
  },
  {
    id: 8,
    exam: 'CAT 1',
    topic: 'Strobogrammatic Number',
    question: 'Which of the following digits remain valid when rotated 180 degrees in a strobogrammatic number?',
    options: [
      '0, 1, 6, 8, 9',
      '0, 1, 2, 5, 8',
      '1, 3, 5, 7, 9',
      '0, 2, 4, 6, 8'
    ],
    correctIndex: 0,
    explanation: 'When rotated 180 degrees, 0 -> 0, 1 -> 1, 8 -> 8, 6 -> 9, and 9 -> 6. Digits like 2, 3, 4, 5, 7 do not form valid numerals when rotated.'
  },
  {
    id: 9,
    exam: 'CAT 1',
    topic: 'Strobogrammatic Number',
    question: 'Which of the following numbers is strobogrammatic?',
    options: [
      '121',
      '69',
      '898',
      '105'
    ],
    correctIndex: 1,
    explanation: 'Rotating "69" by 180 degrees yields "69" (6 turns to 9 and moves to end, 9 turns to 6 and moves to front). Hence, 69 is strobogrammatic.'
  },
  {
    id: 10,
    exam: 'CAT 1',
    topic: 'Remainder Theorem',
    question: 'What is the fundamental condition required on moduli m1, m2, ..., mk in the Chinese Remainder Theorem?',
    options: [
      'All moduli must be prime numbers',
      'All moduli must be pairwise coprime (gcd(mi, mj) = 1 for all i != j)',
      'All moduli must be equal',
      'All moduli must be powers of 2'
    ],
    correctIndex: 1,
    explanation: 'The Chinese Remainder Theorem guarantees a unique solution modulo M = m1 * m2 * ... * mk if and only if all moduli are pairwise coprime.'
  },
  {
    id: 11,
    exam: 'CAT 1',
    topic: 'Remainder Theorem',
    question: 'Find the smallest positive integer x such that x = 2 (mod 3) and x = 3 (mod 5).',
    options: [
      '8',
      '11',
      '14',
      '23'
    ],
    correctIndex: 0,
    explanation: 'Testing values: 8 % 3 = 2, and 8 % 5 = 3. Both conditions are satisfied, so x = 8 is the smallest positive solution.'
  },
  {
    id: 12,
    exam: 'CAT 1',
    topic: 'Toggle the switch & Alice Apple tree',
    question: 'In the Bulb Switcher problem with N bulbs initially OFF, how many bulbs remain ON after N rounds of toggling?',
    options: [
      'N / 2',
      'floor(sqrt(N))',
      'N - floor(sqrt(N))',
      'Number of primes <= N'
    ],
    correctIndex: 1,
    explanation: 'A bulb at position k is toggled once for every factor of k. Bulbs end up ON if and only if they are toggled an odd number of times. Only perfect squares have an odd number of factors. Therefore, exactly floor(sqrt(N)) bulbs remain ON.'
  },
  {
    id: 13,
    exam: 'CAT 1',
    topic: 'Toggle the switch & Alice Apple tree',
    question: 'In the Alice Apple Tree problem, apples grow in concentric squares around (0,0). For level k, the perimeter of the square has how many apples per tree on each side?',
    options: [
      'Apples grow proportionally to the perimeter 12 * k^2',
      'Apples equal k + 4',
      'Apples grow in arithmetic progression of difference 2',
      'Apples are constant across all levels'
    ],
    correctIndex: 0,
    explanation: 'For a square at distance k from origin, the perimeter contains 8*k trees, and the total apples harvested from all trees on layer k evaluates to 12 * k^2.'
  },
  {
    id: 14,
    exam: 'CAT 1',
    topic: 'Binary Palindrome',
    question: 'What is the binary representation of decimal 9, and is it a binary palindrome?',
    options: [
      '1010, No',
      '1001, Yes',
      '1100, No',
      '1111, Yes'
    ],
    correctIndex: 1,
    explanation: '9 in binary is 1001. Reading from left to right or right to left gives the exact same sequence 1001. Thus, it is a binary palindrome.'
  },
  {
    id: 15,
    exam: 'CAT 1',
    topic: 'Binary Palindrome',
    question: 'How can you efficiently check if the binary representation of an integer n is a palindrome?',
    options: [
      'Count the number of 1s in n',
      'Reverse the bits of n and compare with original n',
      'Check if n is an odd number',
      'Check if n & (n - 1) == 0'
    ],
    correctIndex: 1,
    explanation: 'Reversing the bit sequence and verifying if reversed_n == n confirms palindromic symmetry in O(log n) time.'
  },
  {
    id: 16,
    exam: 'CAT 1',
    topic: 'Java Basics & Bitwise',
    question: 'In Java, what does the unsigned right shift operator (>>>) do?',
    options: [
      'Shifts bits right and fills leftmost bits with the original sign bit',
      'Shifts bits right and always fills leftmost bits with 0',
      'Shifts bits left and fills rightmost bits with 0',
      'Inverts all bits after shifting'
    ],
    correctIndex: 1,
    explanation: 'The unsigned right shift operator >>> shifts bits to the right and always inserts zeros at the most significant bit positions, regardless of the sign.'
  },
  {
    id: 17,
    exam: 'CAT 1',
    topic: 'Java Basics & Bitwise',
    question: 'What is the output of the Java expression `5 ^ 5`?',
    options: [
      '10',
      '5',
      '0',
      '1'
    ],
    correctIndex: 2,
    explanation: 'The bitwise XOR operator (^) returns 0 whenever two corresponding bits are identical. Therefore, any number XORed with itself produces 0.'
  },
  {
    id: 18,
    exam: 'CAT 1',
    topic: 'Java Basics & Bitwise',
    question: 'Which bitwise operation checks if an integer n is a power of 2?',
    options: [
      'n & 1 == 0',
      'n > 0 && (n & (n - 1)) == 0',
      'n | (n - 1) == 0',
      'n ^ (n + 1) == 0'
    ],
    correctIndex: 1,
    explanation: 'A power of two in binary has exactly one 1 bit (e.g. 8 is 1000). Subtracting 1 flips all bits up to that bit (7 is 0111). Their bitwise AND is 0.'
  },

  // ==========================================
  // CAT 2: From Booth's to Lexicographical Palindrome (Q19 - Q35)
  // ==========================================
  {
    id: 19,
    exam: 'CAT 2',
    topic: "Booth's Algorithm",
    question: "What is Booth's Multiplication Algorithm primarily used for?",
    options: [
      'Multiplying two floating point numbers',
      'Multiplying two signed binary integers in two’s complement notation',
      'Finding the GCD of two polynomials',
      'Sorting binary search trees'
    ],
    correctIndex: 1,
    explanation: "Booth's algorithm multiplies signed binary numbers in two's complement form without requiring separate sign handling."
  },
  {
    id: 20,
    exam: 'CAT 2',
    topic: "Booth's Algorithm",
    question: "In Booth's algorithm, what action is performed when the current multiplier bit Q0 and previous bit Q-1 are (1, 0)?",
    options: [
      'Add multiplicand M to accumulator A, then arithmetic right shift',
      'Subtract multiplicand M from accumulator A, then arithmetic right shift',
      'Arithmetic right shift only',
      'Rotate left by 1 bit'
    ],
    correctIndex: 1,
    explanation: "A transition from 0 to 1 (Q0 = 1, Q-1 = 0) represents the beginning of a block of 1s in the multiplier, requiring subtraction: A = A - M, followed by arithmetic right shift."
  },
  {
    id: 21,
    exam: 'CAT 2',
    topic: "Euclid's Algorithm",
    question: "What is the worst-case number of divisions in Euclid's algorithm for two integers a and b? (Lamé's Theorem)",
    options: [
      'O(a + b)',
      'O(log(min(a, b)))',
      'O(min(a, b))',
      'O(sqrt(a * b))'
    ],
    correctIndex: 1,
    explanation: "By Lamé's Theorem, the number of steps in Euclid's algorithm never exceeds 5 times the number of decimal digits of the smaller number, giving O(log(min(a, b))) complexity. The worst case occurs for consecutive Fibonacci numbers."
  },
  {
    id: 22,
    exam: 'CAT 2',
    topic: "Euclid's Algorithm",
    question: 'The Extended Euclidean Algorithm computes integers x and y such that:',
    options: [
      'a * x + b * y = gcd(a, b)',
      'a * x - b * y = 0',
      'x^a + y^b = gcd(a, b)',
      'a * x = b * y'
    ],
    correctIndex: 0,
    explanation: "Bézout's identity states that for nonzero integers a and b, there exist integers x and y such that a*x + b*y = gcd(a, b). The Extended Euclidean Algorithm calculates these coefficients."
  },
  {
    id: 23,
    exam: 'CAT 2',
    topic: 'Karatsuba Algorithm',
    question: 'What is the time complexity of the Karatsuba multiplication algorithm?',
    options: [
      'O(n^2)',
      'O(n log n)',
      'O(n^(log2(3))) ≈ O(n^1.585)',
      'O(n^3)'
    ],
    correctIndex: 2,
    explanation: 'Karatsuba reduces 4 recursive multiplications to 3. By Master Theorem: T(n) = 3*T(n/2) + O(n), which solves to O(n^(log2 3)) ≈ O(n^1.585).'
  },
  {
    id: 24,
    exam: 'CAT 2',
    topic: 'Karatsuba Algorithm',
    question: 'How does Karatsuba reduce four multiplications (ac, ad, bc, bd) into three?',
    options: [
      'By calculating (a + b)*(c + d) and subtracting ac and bd',
      'By computing a * d only',
      'By precomputing all products in lookup tables',
      'By converting decimal numbers to ternary'
    ],
    correctIndex: 0,
    explanation: 'Since (a+b)(c+d) = ac + ad + bc + bd, we can find (ad + bc) as (a+b)(c+d) - ac - bd, requiring only 3 multiplications: ac, bd, and (a+b)(c+d).'
  },
  {
    id: 25,
    exam: 'CAT 2',
    topic: 'Longest Sequence of 1 after flipping a bit',
    question: 'For n = 1775 (binary 11011101111), what is the length of the longest sequence of 1s obtainable by flipping at most one 0 to 1?',
    options: [
      '6',
      '7',
      '8',
      '9'
    ],
    correctIndex: 2,
    explanation: 'The binary string has blocks of 1s: 4 ones, then a 0, then 3 ones. Flipping the 0 at bit position 4 merges the block of 4 ones and 3 ones plus the flipped bit: 4 + 1 + 3 = 8.'
  },
  {
    id: 26,
    exam: 'CAT 2',
    topic: 'Swap two nibbles in a byte',
    question: 'Which bitwise operation swaps the two 4-bit nibbles of an 8-bit integer n?',
    options: [
      '((n & 0x0F) << 4) | ((n & 0xF0) >> 4)',
      '((n & 0xFF) << 8) | (n >> 8)',
      '(n << 4) & (n >> 4)',
      '~n ^ 0x0F'
    ],
    correctIndex: 0,
    explanation: '0x0F isolates the lower nibble and shifts it left by 4; 0xF0 isolates the upper nibble and shifts it right by 4. Combining them with OR swaps the nibbles.'
  },
  {
    id: 27,
    exam: 'CAT 2',
    topic: 'Swap two nibbles in a byte',
    question: 'If n = 100 (binary 0110 0100), what is the result after swapping its two nibbles?',
    options: [
      '50',
      '70',
      '80',
      '100'
    ],
    correctIndex: 1,
    explanation: 'Left nibble is 0110 (6) and right nibble is 0100 (4). Swapping them gives 0100 0110 in binary, which is 64 + 4 + 2 = 70 in decimal.'
  },
  {
    id: 28,
    exam: 'CAT 2',
    topic: 'Block Swap Algorithm',
    question: 'What is the Block Swap Algorithm used for in array manipulations?',
    options: [
      'Rotating an array of size n by d positions in O(n) time and O(1) space',
      'Sorting elements using divide and conquer',
      'Transposing a square matrix in-place',
      'Finding the longest common subsequence'
    ],
    correctIndex: 0,
    explanation: 'The Block Swap Algorithm rotates an array left or right by d elements in linear O(n) time using O(1) auxiliary space by iteratively swapping blocks A and B.'
  },
  {
    id: 29,
    exam: 'CAT 2',
    topic: 'Max product subarray',
    question: 'Why does Kadane’s standard algorithm need modification for the Maximum Product Subarray problem?',
    options: [
      'Arrays can contain zero only',
      'Multiplying two negative numbers produces a positive number',
      'Product can never exceed sum',
      'Product is only defined for integers'
    ],
    correctIndex: 1,
    explanation: 'A large negative product can become the maximum positive product when multiplied by a negative number. Thus, we must maintain both max_product and min_product at each step.'
  },
  {
    id: 30,
    exam: 'CAT 2',
    topic: 'Max product subarray',
    question: 'What is the maximum product subarray for nums = [2, 3, -2, 4]?',
    options: [
      '4',
      '6',
      '24',
      '-2'
    ],
    correctIndex: 1,
    explanation: 'The contiguous subarray [2, 3] gives 2 * 3 = 6, which is the maximum possible product.'
  },
  {
    id: 31,
    exam: 'CAT 2',
    topic: 'Maximum sum of hour glass in matrix',
    question: 'How many elements are included in a standard 3x3 hourglass shape in a 2D matrix?',
    options: [
      '5',
      '7',
      '9',
      '6'
    ],
    correctIndex: 1,
    explanation: 'An hourglass consists of 3 elements on top row, 1 element in the center row, and 3 elements on bottom row: 3 + 1 + 3 = 7 elements.'
  },
  {
    id: 32,
    exam: 'CAT 2',
    topic: 'Max Equilibrium Sum',
    question: 'An equilibrium index in an array is an index i such that:',
    options: [
      'Sum of elements at even indices equals sum at odd indices',
      'Prefix sum including arr[i] equals suffix sum including arr[i]',
      'arr[i] equals arr[n - 1 - i]',
      'arr[i] is greater than all elements to its left'
    ],
    correctIndex: 1,
    explanation: 'In the Maximum Equilibrium Sum problem, an equilibrium position satisfies sum(arr[0..i]) == sum(arr[i..n-1]).'
  },
  {
    id: 33,
    exam: 'CAT 2',
    topic: 'Leaders in array',
    question: 'What is the optimal time complexity to find all leaders in an array of size n?',
    options: [
      'O(n^2)',
      'O(n log n)',
      'O(n)',
      'O(1)'
    ],
    correctIndex: 2,
    explanation: 'By scanning the array from right to left while keeping track of the maximum element seen so far, all leaders can be identified in a single pass of O(n) time.'
  },
  {
    id: 34,
    exam: 'CAT 2',
    topic: 'Majority element',
    question: 'What are the time and auxiliary space complexities of the Boyer-Moore Voting Algorithm for finding a majority element (> n/2)?',
    options: [
      'O(n log n) time, O(1) space',
      'O(n) time, O(1) space',
      'O(n) time, O(n) space',
      'O(n^2) time, O(1) space'
    ],
    correctIndex: 1,
    explanation: 'Boyer-Moore Voting Algorithm cancels out pairs of distinct elements in a single pass, using O(n) time and O(1) extra memory.'
  },
  {
    id: 35,
    exam: 'CAT 2',
    topic: 'Lexicographically first palindromic string',
    question: 'What is the necessary and sufficient condition for a string to be rearranged into a palindrome?',
    options: [
      'All characters must appear an even number of times',
      'At most one character has an odd frequency',
      'The string length must be a prime number',
      'The string must contain vowels only'
    ],
    correctIndex: 1,
    explanation: 'A palindrome is symmetric around its center. Thus, all characters must have even frequencies, except possibly one character in the center for odd-length palindromes.'
  },

  // ==========================================
  // FAT: Post-CAT 2 Topics (Q36 - Q50)
  // ==========================================
  {
    id: 36,
    exam: 'FAT',
    topic: 'Natural Sort order',
    question: 'How does Natural Sort order differ from standard alphabetical (lexicographical) sort?',
    options: [
      'It sorts uppercase letters after lowercase letters',
      'It treats multi-digit numbers as single numeric values rather than comparing individual character digits',
      'It sorts strings based on word count',
      'It reverses alphabetical ordering'
    ],
    correctIndex: 1,
    explanation: 'Under alphabetical sorting, "file10" comes before "file2" because \'1\' < \'2\'. Natural Sort treats "10" as greater than "2", sorting as "file2", then "file10".'
  },
  {
    id: 37,
    exam: 'FAT',
    topic: 'Move hyphen to beginning',
    question: 'What is the time complexity to move all hyphens to the beginning of a string while maintaining the relative order of other characters?',
    options: [
      'O(1)',
      'O(n)',
      'O(n log n)',
      'O(n^2)'
    ],
    correctIndex: 1,
    explanation: 'In a single pass, we can count the number of hyphens and collect characters into a StringBuilder, taking O(n) time.'
  },
  {
    id: 38,
    exam: 'FAT',
    topic: "Manacher's Algorithm",
    question: "What is the primary breakthrough of Manacher's Algorithm for Longest Palindromic Substring?",
    options: [
      'It uses hashing to solve it in O(n log n)',
      'It achieves optimal linear time O(n) by reusing previously computed palindrome radii',
      'It uses suffix trees in O(n^2)',
      'It only works for strings of even lengths'
    ],
    correctIndex: 1,
    explanation: "Manacher's algorithm solves the longest palindromic substring problem in O(n) time by inserting delimiters and mirroring previously discovered palindromic boundaries."
  },
  {
    id: 39,
    exam: 'FAT',
    topic: 'Sorted Unique Permutation',
    question: 'For a string with n characters where character c occurs f_c times, how many unique permutations exist?',
    options: [
      'n!',
      'n! / (f1! * f2! * ... * fk!)',
      '2^n',
      'n^2'
    ],
    correctIndex: 1,
    explanation: 'Multinomial permutation formula states the number of distinct permutations of n items with frequencies f1, f2, ... fk is n! / (f1! * f2! * ... * fk!).'
  },
  {
    id: 40,
    exam: 'FAT',
    topic: 'Maneuvering',
    question: 'In a grid of size m x n, how many unique paths exist from top-left (0,0) to bottom-right (m-1, n-1) moving only Right or Down?',
    options: [
      'm * n',
      'C(m + n - 2, m - 1)',
      '2^(m + n)',
      '(m - 1)!'
    ],
    correctIndex: 1,
    explanation: 'To reach (m-1, n-1), you must make exactly (m-1) Down moves and (n-1) Right moves in any sequence. Total moves = m + n - 2, so paths = C(m + n - 2, m - 1).'
  },
  {
    id: 41,
    exam: 'FAT',
    topic: 'Josephus trap',
    question: 'In the Josephus problem with n people and step size k, what is the 0-indexed recurrence relation for survivor position J(n, k)?',
    options: [
      'J(n, k) = J(n - 1, k) + k',
      'J(n, k) = (J(n - 1, k) + k) % n',
      'J(n, k) = J(n / 2, k)',
      'J(n, k) = (J(n - 1, k) * k) % n'
    ],
    correctIndex: 1,
    explanation: 'When one person is eliminated, the problem reduces to n-1 people with the counting starting from the next position: J(n, k) = (J(n - 1, k) + k) % n with J(1, k) = 0.'
  },
  {
    id: 42,
    exam: 'FAT',
    topic: 'Maze Solving',
    question: 'In the classic Rat in a Maze backtracking algorithm, why do we mark a cell as unvisited (backtrack) when returning from an unsuccessful path?',
    options: [
      'To prevent memory overflow',
      'To allow that cell to be part of other potential valid paths',
      'To reset the recursion stack limit',
      'Backtracking does not require unmarking'
    ],
    correctIndex: 1,
    explanation: 'Unmarking a cell (setting visited[r][c] = false) restores state so alternative exploration branches can reuse that cell if needed.'
  },
  {
    id: 43,
    exam: 'FAT',
    topic: 'N Queens',
    question: 'Two queens at positions (r1, c1) and (r2, c2) attack each other diagonally if and only if:',
    options: [
      'r1 == r2',
      'c1 == c2',
      '|r1 - r2| == |c1 - c2|',
      'r1 + c1 == r2 * c2'
    ],
    correctIndex: 2,
    explanation: 'A diagonal slope on a grid is ±1, which translates to |r1 - r2| == |c1 - c2| (or r1 - c1 == r2 - c2 and r1 + c1 == r2 + c2).'
  },
  {
    id: 44,
    exam: 'FAT',
    topic: 'Warnsdorff’s Algorithm',
    question: 'Warnsdorff’s heuristic for the Knight’s Tour problem recommends moving the knight to the adjacent square that has:',
    options: [
      'The maximum number of onward moves',
      'The minimum number of unvisited onward moves',
      'The highest coordinate value',
      'An even sum of coordinates'
    ],
    correctIndex: 1,
    explanation: 'By moving to the square with the lowest degree (fewest onward moves), Warnsdorff’s heuristic avoids isolating corners and edges early in the tour.'
  },
  {
    id: 45,
    exam: 'FAT',
    topic: 'Hamiltonian Cycle',
    question: 'What is a Hamiltonian Cycle in an undirected graph?',
    options: [
      'A cycle that visits every edge exactly once',
      'A closed loop that visits every vertex exactly once and returns to the start',
      'A tree containing all vertices with minimum edge weight',
      'A path between the two furthest vertices'
    ],
    correctIndex: 1,
    explanation: 'A Hamiltonian Cycle is a closed loop passing through every vertex of the graph exactly once. (Visiting every edge once is an Eulerian Circuit).'
  },
  {
    id: 46,
    exam: 'FAT',
    topic: "Kruskal's Algorithm",
    question: "Kruskal's algorithm finds a Minimum Spanning Tree (MST) using which algorithmic paradigm and auxiliary data structure?",
    options: [
      'Greedy algorithm with Disjoint Set Union (Union-Find)',
      'Dynamic programming with Fibonacci heap',
      'Divide and conquer with segment tree',
      'Depth-first search with topological sort'
    ],
    correctIndex: 0,
    explanation: "Kruskal's algorithm greedily sorts all edges by weight and adds non-cycle-forming edges using a Disjoint Set Union (DSU) structure to check connectivity in O(E log E) time."
  },
  {
    id: 47,
    exam: 'FAT',
    topic: 'Activity Selection Problem',
    question: 'In the greedy Activity Selection problem, which sorting criterion guarantees the maximum number of mutually compatible activities?',
    options: [
      'Sort activities by increasing start time',
      'Sort activities by increasing finish time',
      'Sort activities by decreasing duration',
      'Sort activities by activity ID'
    ],
    correctIndex: 1,
    explanation: 'Sorting by earliest finish time leaves the maximum amount of remaining time available for subsequent activities, achieving the optimal greedy choice.'
  },
  {
    id: 48,
    exam: 'FAT',
    topic: 'Graph Coloring',
    question: 'What is the chromatic number of a planar graph according to the Four Color Theorem?',
    options: [
      'At most 2',
      'At most 3',
      'At most 4',
      'At most 5'
    ],
    correctIndex: 2,
    explanation: 'The Four Color Theorem proves that any planar map/graph can be colored using at most 4 colors such that no adjacent regions share the same color.'
  },
  {
    id: 49,
    exam: 'FAT',
    topic: 'Huffman Coding',
    question: 'What key property makes Huffman coding an optimal prefix code?',
    options: [
      'All codewords have the exact same length',
      'No codeword is a prefix of any other codeword, and frequent characters receive shorter codes',
      'It sorts characters alphabetically',
      'It requires a quadratic time decoding tree'
    ],
    correctIndex: 1,
    explanation: 'Huffman coding builds an optimal binary prefix tree where no code is a prefix of another (allowing instantaneous unambiguous decoding) and more frequent symbols have shorter codes.'
  },
  {
    id: 50,
    exam: 'FAT',
    topic: 'Cryption Techniques',
    question: 'In asymmetric cryptography (such as RSA), which key is used for encrypting a message intended for a recipient?',
    options: [
      'The sender’s private key',
      'The recipient’s public key',
      'A shared pre-hashed symmetric key',
      'The recipient’s private key'
    ],
    correctIndex: 1,
    explanation: 'In asymmetric public-key cryptography, anyone can encrypt a message using the recipient’s public key, but only the recipient can decrypt it using their matching private key.'
  }
];

export function getMcqsByExam(exam = 'All') {
  if (exam === 'All' || exam === 'FAT') {
    return mcqs;
  }
  if (exam === 'FAT_ONLY') {
    return mcqs.filter((m) => m.exam === 'FAT');
  }
  return mcqs.filter((m) => m.exam === exam);
}

export function getFilteredMcqs({ exam = 'All', topic = 'All', search = '' } = {}) {
  const query = search.trim().toLowerCase();
  return mcqs.filter((m) => {
    let matchesExam = true;
    if (exam === 'CAT 1') matchesExam = m.exam === 'CAT 1';
    else if (exam === 'CAT 2') matchesExam = m.exam === 'CAT 2';
    else if (exam === 'FAT_ONLY') matchesExam = m.exam === 'FAT';
    else if (exam === 'FAT' || exam === 'All') matchesExam = true;

    const matchesTopic = topic === 'All' || m.topic === topic;
    const matchesSearch =
      !query ||
      m.question.toLowerCase().includes(query) ||
      m.topic.toLowerCase().includes(query) ||
      m.options.some((opt) => opt.toLowerCase().includes(query));
    return matchesExam && matchesTopic && matchesSearch;
  });
}

export function getMcqTopics() {
  const topics = new Set(mcqs.map((m) => m.topic));
  return ['All', ...Array.from(topics)];
}

export default mcqs;
