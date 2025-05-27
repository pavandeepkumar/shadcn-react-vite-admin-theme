#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const projectName = process.argv[2];

if (!projectName) {
    console.error("❌ Please provide a project name.");
    process.exit(1);
}

const currentPath = process.cwd();
const targetPath = path.join(currentPath, projectName);
const templatePath = path.join(__dirname, "template");

if (fs.existsSync(targetPath)) {
    console.error("❌ Folder already exists. Please choose a different project name.");
    process.exit(1);
}

fs.mkdirSync(targetPath);

// Copy files
const copyRecursiveSync = (src, dest) => {
    const files = fs.readdirSync(src);
    files.forEach(file => {
        const current = path.join(src, file);
        const target = path.join(dest, file);
        if (fs.lstatSync(current).isDirectory()) {
            fs.mkdirSync(target);
            copyRecursiveSync(current, target);
        } else {
            fs.copyFileSync(current, target);
        }
    });
};

copyRecursiveSync(templatePath, targetPath);

// Install dependencies
console.log("📦 Installing dependencies...");
execSync("npm install", { cwd: targetPath, stdio: "inherit" });

console.log("✅ Project created successfully!");
