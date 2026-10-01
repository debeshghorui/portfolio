# 🚀 C Standard Library Extensions

> **Supercharge your C development with battle-tested utilities and modern conveniences**

Transform your C projects from basic to brilliant! This collection of carefully crafted header files and utility functions fills the gaps in the standard library, giving you the tools to write cleaner, more efficient, and more maintainable code.

[![C Standard](https://img.shields.io/badge/C-89%2F99%2F11-blue.svg)](https://en.wikipedia.org/wiki/C_(programming_language))
[![Compiler Support](https://img.shields.io/badge/Compilers-GCC%20%7C%20Clang-green.svg)](https://github.com/your-username/c-extensions)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## ✨ Why C Extensions?

**Stop reinventing the wheel.** Every C developer has written the same utility functions dozens of times. We've collected the most essential ones into a single, well-tested library that you can drop into any project.

### 🎯 Perfect For:
- **System programmers** building robust applications
- **Embedded developers** needing lightweight utilities  
- **Students** learning C with modern conveniences
- **Game developers** requiring high-performance helpers
- **Anyone** tired of writing the same utility code repeatedly

---

## 🛠️ How to Use

### 🎯 Method 1: System-Wide Installation
**Best for development environments where you want utilities available globally**

1. **Navigate to your compiler's include directory:**
   ```bash
   # For MinGW on Windows
   cd C:\MinGW\include
   
   # For GCC on Linux/macOS
   cd /usr/local/include
   # or
   cd /usr/include
   ```

2. **Copy the header files:**
   ```bash
   cp /path/to/c-extensions/*.h ./
   ```

3. **Include in your projects:**
   ```c
   #include <your_header.h>  // Now available system-wide
   ```

### 📁 Method 2: Project-Level Integration  
**Best for portable projects and team collaboration**

1. **Create the recommended folder structure:**
   ```
   your-project/
   ├── include/
   │   ├── header1.h
   │   ├── header2.h
   │   └── header3.h
   ├── src/
   │   └── main.c
   ├── lib/              # Optional: for .c implementation files
   │   ├── impl1.c
   │   └── impl2.c
   └── Makefile
   ```

2. **Copy headers to your include directory:**
   ```bash
   cp /path/to/c-extensions/*.h ./include/
   ```

3. **Update your compilation command:**
   ```bash
   gcc -I./include -o program main.c
   ```

### ⚡ Method 3: Direct Integration
**Best for quick prototypes and single-file projects**

1. **Copy desired functions directly:**
   - Open the `.c` files from this repository
   - Copy the functions you need into your source files
   - Include any necessary headers at the top

2. **Or include headers inline:**
   ```c
   // Copy header content directly into your file
   #ifndef YOUR_UTILS_H
   #define YOUR_UTILS_H
   
   // Paste header content here
   
   #endif
   ```

---

## 🔧 Integration Best Practices

### **For Header-Only Libraries:**
```c
// In your main.c or implementation file
#define IMPLEMENTATION_NAME_IMPLEMENTATION  // Enable implementation
#include "header_name.h"
```

### **For Headers with Separate Implementation:**
```bash
# Compile with implementation files
gcc -I./include -o program main.c lib/impl1.c lib/impl2.c
```

### **Makefile Integration:**
```makefile
CC = gcc
CFLAGS = -Wall -Wextra -std=c99
INCLUDES = -I./include
SRCDIR = src
LIBDIR = lib

SOURCES = $(wildcard $(SRCDIR)/*.c) $(wildcard $(LIBDIR)/*.c)
OBJECTS = $(SOURCES:.c=.o)

program: $(OBJECTS)
	$(CC) $(OBJECTS) -o $@

%.o: %.c
	$(CC) $(CFLAGS) $(INCLUDES) -c $< -o $@
```

---

## 🧪 Testing Your Integration

### **Quick Verification:**
```c
#include <stdio.h>
#include "your_header.h"  // Your C extension header

int main() {
    printf("C Extensions loaded successfully!\n");
    
    // Test a simple function from your extensions
    // (This will depend on what's in your actual headers)
    
    return 0;
}
```

### **Compile and Test:**
```bash
gcc -I./include -o test test.c
./test
```

---

## 💻 Compatibility

### **Supported Compilers:**
- **GCC** 4.8 and later
- **Clang** 3.9 and later
- **MSVC** 2015 and later (with some limitations)

### **C Standards:**
- ✅ **C89/C90** - Full compatibility
- ✅ **C99** - Full compatibility  
- ✅ **C11** - Full compatibility
- ⚠️ **C17/C18** - Mostly compatible

### **Platforms:**
- ✅ **Linux** (all major distributions)
- ✅ **Windows** (MinGW, MSVC, Cygwin)
- ✅ **macOS** (Xcode, Homebrew GCC)
- ✅ **Embedded systems** (with standard C library)

---

## 🚀 Getting Started

1. **Choose your integration method** based on your project needs
2. **Download or clone** this repository
3. **Follow the setup steps** for your chosen method
4. **Start coding** with enhanced C capabilities!

### **Next Steps:**
- Browse the header files to see available functions
- Check the documentation for detailed API information
- Look at example code to understand usage patterns
- Join our community for support and updates

---

## 🤝 Contributing

We welcome contributions from developers of all skill levels!

### **Ways to Contribute:**
- 🐛 **Bug Reports** - Found something broken? Let us know!
- 💡 **Feature Requests** - Have ideas for new utilities?
- 🔧 **Code Contributions** - Submit pull requests with improvements
- 📖 **Documentation** - Help improve guides and examples
- 🧪 **Testing** - Help test on different platforms and compilers

### **Getting Started with Contributing:**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📜 License

This project is licensed under the [MIT License](LICENSE). 

**What this means:**
- ✅ Use in commercial projects
- ✅ Modify and redistribute
- ✅ Private use
- ✅ No warranty or liability

---

<div align="center">

**Ready to enhance your C development experience?**

[⭐ Star this repository](https://github.com/DebeshGhorui/c-extensions) 

---

*Built by C developers, for C developers* 🚀

</div>
