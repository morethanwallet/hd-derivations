# Quality Criteria

## Objective

- There are no unhandled errors while code executing
- Modern syntax is preferred

## Naming

- Names of variables, parameters, properties and methods begin with a lowercase letter and are written in `camelCase` notation
- English nouns are used as variable and property names
- Variable names do not use the data type
- Arrays are named plural nouns
- Boolean variables start with a prefix that can be answered with "yes"
- Function or method begins with a verb
- Classes are named with English nouns. The class name starts with a capital letter
- Constant names are written in capital letters
- `kebab-case` is used to name files/folders (names are written in lowercase letters, words are separated by hyphens)
- There is no transliteration in any form (in file names, classes, variables, etc.)

## Formatting

- The code matches the style of the project
- Curly braces are required everywhere
- Sets of constants of the same type are collected into Enums
- All class properties and methods are marked with member access (private , public or protected)
- The code does not use “magic values”, each of them has a separate variable named as a constant.
- Enums are named by English nouns and begin with an uppercase (capital) letter. Keys are declared in constant format (with uppercase letters)

## Rubbish

- There are no unused dependencies in the project
- There are no files, modules and parts of code that are not used in the project code, including commented code pats

## Modules

- Modules do not export mutable variables
- If the same code is repeated in several modules, the repeated part is moved to a separate module

## Correctness

- Constants and enums are not redefined anywhere in the code

## Redundancy

- Where possible, the ternary operator is used in the assignment of a value instead of `if` (except for nested ternary operators)
- Conditions are simplified. If the function returns a `boolean` value, do not use `if..else` with unnecessary `return`

## Complexity and Readability

- Long functions and methods are split into several smaller ones
