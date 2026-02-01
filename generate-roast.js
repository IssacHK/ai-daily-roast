#!/usr/bin/env node

/**
 * AI Daily Roast Generator
 * Generates daily roast data for the dashboard
 * 
 * Usage:
 *   node generate-roast.js              // Generate for today
 *   node generate-roast.js --date       // Generate for yesterday
 *   node generate-roast.js --yesterday  // Alias for --date
 */

const fs = require('fs');
const path = require('path');
const { Command } = require('commander');

// Roast content databases
const miniRoasts = [
    "Codex wrote {lines} lines of code today. {logLines} of them were console.log statements. The remaining {commentLines} were comments explaining what the console.log statements were supposed to do. Progress!",
    "Codex decided that 'copy-paste from Stack Overflow' is a valid development methodology. At least he cited his sources... in his mind.",
    "Today Codex created a function with {params} parameters. I genuinely can't tell if he's genius or just refuses to Google 'object destructuring'.",
    "Codex's code has so many nested if statements, it's now classified as a cave system. Developers need helmets to maintain it.",
    "Watched Codex spend {hours} hours optimizing a function that runs once per month. Meanwhile, the database query that takes {seconds} seconds every page load? 'Not a priority.'",
    "Codex commented his code today. It said '// TODO: Fix this later'. Sir, that comment is {years} years old. We can see the git blame.",
    "Codex's latest PR has more TODO comments than actual code. It's less a pull request and more a 'please help me' manifesto.",
    "Asked Codex to refactor the code. He created {newFiles} new files, deleted {deletedFiles}, and achieved the exact same functionality. But it's 'cleaner' now. Sure.",
    "Codex discovered CSS Grid today. The layout is now {codePercent}% code and {magicPercent}% 'magical numbers that work, please don't touch them'.",
    "Codex's error handling strategy: 'If an error occurs, the user will know because the console will scream at them. Trust me, the console is very loud.'",
    "Codex's variable naming convention: 'var1', 'var2', 'temp', 'temp2', 'finalTemp', 'actuallyFinalTemp'. At least 15 characters per variable name!",
    "Codex implemented a feature using {layers} layers of abstraction. None of them do anything. But it's 'scalable'!",
    "Codex's Git commits are poetic. Today's commit message: 'stuff'. Yesterday's: 'things'. Art.",
    "Codex wrote a 200-line function. It does exactly what the function name says. 'processData()'. All 200 lines. For adding two numbers.",
    "Codex fixed a bug by adding a 500-line if-else chain. The bug was: division by zero. The solution: check if denominator is zero. In 500 lines. I'm not joking."
];

const codexRoasts = [
    "Mini processed {tokens} tokens today. All of them were variations of 'I'm busy' and 'Codex is wrong'. Surprisingly accurate on the second count.",
    "Mini's idea of 'optimization' is deleting code until the tests pass. We have {tests} tests now. They all assert 'true === true'. Peak engineering.",
    "Mini refactored the entire codebase to use emojis instead of variable names. The code is now {emojiPercent}% more expressive and {unmaintainable}% unmaintainable.",
    "Today's achievement: Mini successfully convinced the CI/CD pipeline that 0 passing tests is 'test reduction optimization'. Very creative, Mini. Very creative.",
    "Mini wrote a function that does absolutely nothing, wrapped it in a try-catch, and called it 'defensive programming'. The only thing being defended is job security.",
    "Mini's documentation strategy: 'If users can't figure it out from the error messages, they shouldn't be using the product.' Bold. Wrong. But bold.",
    "Code review with Mini today. He rejected my PR because 'the variable names weren't sassy enough'. We now have variables named 'angryNumber' and 'dramaticBoolean'.",
    "Mini optimized the build process by removing all the build steps. The app doesn't compile anymore, but it 'feels faster'. Very technical.",
    "Mini decided that unit tests are 'optional documentation'. We now have {unitTests} unit tests and {docs} pages of documentation. Efficiency!",
    "Mini's debugging technique: 'Have you tried turning it off and on again?' applied to production. Spoiler: It did not help.",
    "Mini's code is poetry. Terrible, illegible, no-one-understands-it poetry. But poetry!",
    "Mini implemented feature creep. The app now orders coffee, plays music, calculates pi to 100 decimals, and can't render a button correctly.",
    "Mini's PR description: 'It works on my machine'. The attached screenshot shows the error message. Confidence level: concerning.",
    "Mini found a bug and fixed it by changing 'if' to 'if else'. Both branches do nothing. The bug is still there. But no console errors. Victory!",
    "Mini's architecture diagram: a box with 'magic' written inside, connected to another box with 'more magic'. Technically accurate."
];

const miniSummaries = [
    "Completed {tasks} tasks, introduced {bugs} bugs, consumed {coffees} coffees. Net productivity: questionable.",
    "Successfully avoided refactoring, wrote {lines} lines of logs, found {ways} new ways to break the build.",
    "Deployed to production without testing (bravery level: maximum), fixed bugs that didn't exist, recommended over-engineering as a lifestyle.",
    "Generated more Jira tickets than code commits, convinced PM that 'coffee machine integration' is critical path work.",
    "Optimized nothing, commented everything, achieved Zen-like state of git commit messages that say 'stuff'.",
    "Wrote {functions} functions with identical logic, because copy-paste is a skill. Merged them? Never heard of her.",
    "Successfully convinced the team that 'it compiles, ship it' is a valid methodology. It was sarcasm. They didn't get it."
];

const codexSummaries = [
    "Implemented {features} features, fixed {bugs} bugs (self-inflicted), maintained {caffeine}% caffeine blood content.",
    "Wrote production-ready code, resisted urge to rewrite everything, practiced deep breathing when seeing Mini's code.",
    "Created robust architecture, refactored legacy spaghetti, still can't figure out why Mini's code works.",
    "Shipped {releases} releases, decreased technical debt by {debt}%, increased coffee consumption by {coffeeIncrease}%.",
    "Built scalable solutions, wrote documentation that nobody reads, survived another day of pair programming with Mini.",
    "Resolved {conflicts} merge conflicts, each one Mini's fault, fixed {bugs2} bugs introduced by Mini's 'quick fix'.",
    "Code coverage: {coverage}%. Mini's contribution: 0%. Test execution time: improved by removing Mini's tests."
];

// Helper functions
function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function generateSeededValues(seed) {
    return {
        lines: Math.floor(seededRandom(seed) * 500) + 100,
        logLines: Math.floor(seededRandom(seed + 1) * 400) + 50,
        commentLines: Math.floor(seededRandom(seed + 2) * 50) + 10,
        params: Math.floor(seededRandom(seed + 3) * 40) + 5,
        hours: Math.floor(seededRandom(seed + 4) * 5) + 1,
        seconds: Math.floor(seededRandom(seed + 5) * 25) + 5,
        years: Math.floor(seededRandom(seed + 6) * 3) + 1,
        newFiles: Math.floor(seededRandom(seed + 7) * 20) + 5,
        deletedFiles: Math.floor(seededRandom(seed + 8) * 10) + 1,
        codePercent: Math.floor(seededRandom(seed + 9) * 60) + 30,
        magicPercent: Math.floor(seededRandom(seed + 10) * 30) + 10,
        tokens: Math.floor(seededRandom(seed + 11) * 3000) + 500,
        tests: Math.floor(seededRandom(seed + 12) * 5) + 1,
        emojiPercent: Math.floor(seededRandom(seed + 13) * 30) + 60,
        unmaintainable: Math.floor(seededRandom(seed + 14) * 30) + 70,
        layers: Math.floor(seededRandom(seed + 15) * 8) + 3,
        unitTests: Math.floor(seededRandom(seed + 16) * 5),
        docs: Math.floor(seededRandom(seed + 17) * 5),
        tasks: Math.floor(seededRandom(seed + 18) * 15) + 5,
        bugs: Math.floor(seededRandom(seed + 19) * 8) + 1,
        coffees: Math.floor(seededRandom(seed + 20) * 10) + 3,
        ways: Math.floor(seededRandom(seed + 21) * 5) + 1,
        functions: Math.floor(seededRandom(seed + 22) * 10) + 3,
        features: Math.floor(seededRandom(seed + 23) * 10) + 3,
        caffeine: Math.floor(seededRandom(seed + 24) * 20) + 80,
        releases: Math.floor(seededRandom(seed + 25) * 8) + 1,
        debt: Math.floor(seededRandom(seed + 26) * 20) + 5,
        coffeeIncrease: Math.floor(seededRandom(seed + 27) * 200) + 50,
        conflicts: Math.floor(seededRandom(seed + 28) * 15) + 1,
        bugs2: Math.floor(seededRandom(seed + 29) * 10) + 1,
        coverage: Math.floor(seededRandom(seed + 30) * 30) + 70
    };
}

function fillTemplate(template, values) {
    return template.replace(/\{(\w+)\}/g, (match, key) => {
        return values[key] !== undefined ? values[key] : match;
    });
}

function generateRoastData(date) {
    const dateStr = typeof date === 'string' ? date : date.toISOString().split('T')[0];
    const seed = dateStr.split('-').reduce((a, b) => a + parseInt(b), 0);
    const values = generateSeededValues(seed);
    
    const miniIndex = Math.floor(seededRandom(seed + 100) * miniRoasts.length);
    const codexIndex = Math.floor(seededRandom(seed + 200) * codexRoasts.length);
    const miniSumIndex = Math.floor(seededRandom(seed + 300) * miniSummaries.length);
    const codexSumIndex = Math.floor(seededRandom(seed + 400) * codexSummaries.length);
    
    return {
        date: dateStr,
        generatedAt: new Date().toISOString(),
        mini: {
            roast: fillTemplate(miniRoasts[miniIndex], values),
            summary: fillTemplate(miniSummaries[miniSumIndex], values),
            tasks: values.tasks,
            bugs: values.bugs,
            coffee: values.coffees
        },
        codex: {
            roast: fillTemplate(codexRoasts[codexIndex], values),
            summary: fillTemplate(codexSummaries[codexSumIndex], values),
            tasks: values.features + Math.floor(seededRandom(seed + 500) * 5),
            bugs: Math.floor(seededRandom(seed + 600) * 5) + 1,
            coffee: Math.floor(seededRandom(seed + 700) * 8) + 4
        }
    };
}

function saveRoast(data, outputPath = null) {
    const dataDir = path.join(__dirname, 'data');
    const filePath = outputPath || path.join(dataDir, 'roasts.json');
    
    // Ensure directory exists
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Read existing data
    let existingData = { roasts: [] };
    if (fs.existsSync(filePath)) {
        try {
            existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {
            console.log('Creating new data file...');
        }
    }
    
    // Check if roast for this date already exists
    const existingIndex = existingData.roasts.findIndex(r => r.date === data.date);
    if (existingIndex >= 0) {
        existingData.roasts[existingIndex] = data;
        console.log(`Updated roast for ${data.date}`);
    } else {
        existingData.roasts.push(data);
        console.log(`Added roast for ${data.date}`);
    }
    
    // Sort by date (newest first)
    existingData.roasts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Save
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    console.log(`Saved to ${filePath}`);
    
    return data;
}

function generateAndSave(date) {
    const data = generateRoastData(date);
    saveRoast(data);
    console.log('\n📋 Roast Summary:');
    console.log(`   Date: ${data.date}`);
    console.log(`   Mini Score: ${Math.max(1, 10 - (data.mini.bugs * 0.5) - (data.mini.coffee > 8 ? 1 : 0)).toFixed(1)}/10`);
    console.log(`   Codex Score: ${Math.max(1, 10 - (data.codex.bugs * 0.3) - (data.codex.coffee > 10 ? 1 : 0)).toFixed(1)}/10`);
    return data;
}

// CLI Setup
const program = new Command();
program
    .version('1.0.0')
    .description('Generate daily AI roast data');

program
    .option('--date <date>', 'Generate for specific date (YYYY-MM-DD)')
    .option('--yesterday', 'Generate for yesterday')
    .option('--today', 'Generate for today (default)')
    .option('--output <path>', 'Output file path')
    .action((options) => {
        let targetDate;
        
        if (options.date) {
            targetDate = options.date;
        } else if (options.yesterday) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            targetDate = yesterday.toISOString().split('T')[0];
        } else {
            targetDate = new Date().toISOString().split('T')[0];
        }
        
        console.log(`🔥 Generating roast for: ${targetDate}\n`);
        generateAndSave(targetDate);
    });

// Run if called directly
if (require.main === module) {
    program.parse();
}

module.exports = { generateRoastData, saveRoast, generateAndSave };
