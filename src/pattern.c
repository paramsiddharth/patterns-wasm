#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_STR_LEN 2000

// Return the pattern as a string
// Module.cwrap('pattern', 'string', ['string', 'number', 'string'])('#', 3, 'square')
char* pattern(const char* fill, unsigned int size , const char* type) {
	unsigned int dim = 2 * size - 1;
	char* pat = (char*)malloc(MAX_STR_LEN * sizeof(char));
	if (strcmp(type, "square") == 0) {
		// Square
		for (unsigned int i = 0; i < dim; i++) {
			for (unsigned int j = 0; j < dim; j++) {
				if (i == 0 || i == dim - 1 || j == 0 || j == dim - 1)
					sprintf(pat, "%s%s", pat, fill);
				else
					sprintf(pat, "%s%c", pat, ' ');
			}
			sprintf(pat, "%s%c", pat, '\n');
		}
		return pat;
	} else if (strcmp(type, "swastika") == 0) {
		// Swastika
		for (unsigned int i = 1; i <= dim; i++) {
			for (unsigned int j = 1; j <= dim; j++) {
				if (
						i == size || 
						j == size || 
						i == 1 && j >= size ||
						i == dim && j <= size ||
						j == 1 && i <= size ||
						j == dim && i >= size
					)
					sprintf(pat, "%s%s", pat, fill);
				else
					sprintf(pat, "%s%c", pat, ' ');
			}
			sprintf(pat, "%s%c", pat, '\n');
		}
		return pat;
	} else if (strcmp(type, "triangle") == 0) {
		// Triangle
		for (unsigned int i = 1; i <= dim; i++) {
			for (unsigned int j = 1; j <= i; j++) 
				sprintf(pat, "%s%s", pat, fill);
			sprintf(pat, "%s%c", pat, '\n');
		}
		return pat;
	} else if (strcmp(type, "diamond") == 0) {
		// Diamond
		for (unsigned int i = 1; i <= dim; i++) {
			unsigned int ii = i <= size ? i : dim - i + 1;
			for (unsigned int j = 1; j <= dim; j++) {
				unsigned int jj = j <= size ? j : dim - j + 1;
				if (jj > size - ii && jj < size + ii)
					sprintf(pat, "%s%s", pat, fill);
				else
					sprintf(pat, "%s%c", pat, ' ');
			}
			sprintf(pat, "%s%c", pat, '\n');
		}
		return pat;
	} else {
		// Asterisk
		for (unsigned int i = 1; i <= dim; i++) {
			for (unsigned int j = 1; j <= dim; j++) {
				if (
						i == j || 
						i == size || 
						j == size || 
						i == dim - j + 1
					)
					sprintf(pat, "%s%s", pat, fill);
				else
					sprintf(pat, "%s%c", pat, ' ');
			}
			sprintf(pat, "%s%c", pat, '\n');
		}
		return pat;
	}
	free(pat);
	return ":(";
}

// Testing
int main() {
	// Read input
	unsigned int size;
	printf("Enter the size: ");
	scanf("%u", &size);
	printf("Available patterns:\n\
1. Square\n\
2. Swastika\n\
3. Right-Angled Triangle\n\
4. Diamond\n\
5. Six-Pointed Asterisk\n");
	short int choice;
	printf("Enter your choice: ");
	scanf("%hd", &choice);
	char fill[200];
	printf("Enter the filling character: ");
	scanf("%s", fill);
	char* patch;
	switch (choice) {
		case 1:
			patch = "square";
			break;
		case 2:
			patch = "swastika";
			break;
		case 3:
			patch = "triangle";
			break;
		case 4:
			patch = "diamond";
			break;
		default:
			patch = "asterisk";
	}

	// Call the function and display the output
	printf("%s", pattern(fill, size, patch));
	return 0;
}