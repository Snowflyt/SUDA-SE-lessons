#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// Function to add two long integers
string add(string num1, string num2) {
	string result = "";
	int carry = 0;
	int n1 = num1.size(), n2 = num2.size();
	reverse(num1.begin(), num1.end());
	reverse(num2.begin(), num2.end());

	for (int i = 0; i < n1 || i < n2 || carry; ++i) {
		int sum = carry;
		if (i < n1) sum += num1[i] - '0';
		if (i < n2) sum += num2[i] - '0';
		result += (sum % 10) + '0';
		carry = sum / 10;
	}

	reverse(result.begin(), result.end());
	return result;
}

// Function to subtract two long integers
string subtract(string num1, string num2) {
	// Ensure num1 >= num2
	string result = "";
	int carry = 0;
	int n1 = num1.size(), n2 = num2.size();
	reverse(num1.begin(), num1.end());
	reverse(num2.begin(), num2.end());

	for (int i = 0; i < n1; ++i) {
		int sub = (num1[i] - '0') - carry;
		if (i < n2) sub -= (num2[i] - '0');
		carry = sub < 0 ? 1 : 0;
		if (sub < 0) sub += 10;
		result += sub + '0';
	}

	// Remove leading zeros
	while (result.length() > 1 && result.back() == '0')
		result.pop_back();

	reverse(result.begin(), result.end());
	return result;
}

// Function to multiply two long integers
string multiply(string num1, string num2) {
	int n1 = num1.size(), n2 = num2.size();
	string result(n1 + n2, '0');

	for (int i = n1 - 1; i >= 0; --i) {
		for (int j = n2 - 1; j >= 0; --j) {
			int mul = (num1[i] - '0') * (num2[j] - '0') + (result[i + j + 1] - '0');
			result[i + j + 1] = mul % 10 + '0';
			result[i + j] += mul / 10;
		}
	}

	// Remove leading zeros
	size_t start = result.find_first_not_of("0");
	if (start != string::npos)
		return result.substr(start);
	return "0";
}

int main() {
	// Test cases
	string num1 = "123456789123456789";
	string num2 = "987654321987654321";

	cout << "Addition: " << add(num1, num2) << endl;
	cout << "Subtraction: " << subtract(num2, num1) << endl;
	cout << "Multiplication: " << multiply(num1, num2) << endl;

	return 0;
}
