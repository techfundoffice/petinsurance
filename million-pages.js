#!/usr/bin/env node

import { execSync } from 'child_process';
import { config } from 'dotenv';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';

// Load environment variables
config();

const WORKER_DIR = '/root/million-pages';

function runCommand(command, options = {}) {
  try {
    const result = execSync(command, {
      cwd: WORKER_DIR,
      stdio: 'pipe',
      encoding: 'utf8',
      ...options
    });
    return result.toString().trim();
  } catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
    if (error.stdout) console.log(error.stdout.toString());
    if (error.stderr) console.error(error.stderr.toString());
    process.exit(1);
  }
}

function showMenu() {
  console.clear();
  console.log(chalk.cyan('='.repeat(50)));
  console.log(chalk.cyan.bold('     Million Pages - Cloudflare Worker Manager'));
  console.log(chalk.cyan('='.repeat(50)));
  console.log();
  console.log(chalk.yellow('1.') + ' Deploy Worker');
  console.log(chalk.yellow('2.') + ' View Worker Logs (tail)');
  console.log(chalk.yellow('3.') + ' Worker Status');
  console.log(chalk.yellow('4.') + ' Edit Worker Code');
  console.log(chalk.yellow('5.') + ' Local Development Server');
  console.log(chalk.yellow('6.') + ' View Deployment URL');
  console.log(chalk.yellow('0.') + ' Exit');
  console.log();
}

function deployWorker() {
  console.log(chalk.blue('\n📦 Deploying worker to Cloudflare...\n'));
  
  if (!process.env.CLOUDFLARE_API_TOKEN) {
    console.error(chalk.red('Error: CLOUDFLARE_API_TOKEN not found in .env file'));
    return;
  }

  try {
    const output = runCommand('wrangler deploy --env=""', {
      env: { ...process.env, CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN }
    });
    console.log(chalk.green('\n✅ Worker deployed successfully!'));
    console.log(output);
  } catch (error) {
    console.error(chalk.red('Failed to deploy worker'));
  }
}

function viewLogs() {
  console.log(chalk.blue('\n📋 Tailing worker logs (Ctrl+C to stop)...\n'));
  
  try {
    execSync('wrangler tail --env=""', {
      cwd: WORKER_DIR,
      stdio: 'inherit',
      env: { ...process.env, CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN }
    });
  } catch (error) {
    // User likely pressed Ctrl+C
  }
}

function workerStatus() {
  console.log(chalk.blue('\n📊 Worker Status:\n'));
  
  try {
    // Check if worker code exists
    const workerPath = join(WORKER_DIR, 'src/index.js');
    if (existsSync(workerPath)) {
      console.log(chalk.green('✓ Worker code exists'));
      
      // Show first few lines of worker code
      const code = readFileSync(workerPath, 'utf8');
      const lines = code.split('\n').slice(0, 10);
      console.log(chalk.gray('\nWorker code preview:'));
      lines.forEach(line => console.log(chalk.gray('  ' + line)));
      if (code.split('\n').length > 10) {
        console.log(chalk.gray('  ...'));
      }
    } else {
      console.log(chalk.red('✗ Worker code not found'));
    }

    // Check wrangler.toml
    const configPath = join(WORKER_DIR, 'wrangler.toml');
    if (existsSync(configPath)) {
      console.log(chalk.green('\n✓ Wrangler configuration exists'));
      const config = readFileSync(configPath, 'utf8');
      console.log(chalk.gray('\nConfiguration:'));
      config.split('\n').forEach(line => console.log(chalk.gray('  ' + line)));
    }

    // Check API token
    if (process.env.CLOUDFLARE_API_TOKEN) {
      console.log(chalk.green('\n✓ API token configured'));
    } else {
      console.log(chalk.red('\n✗ API token not found in .env'));
    }
  } catch (error) {
    console.error(chalk.red(`Error checking status: ${error.message}`));
  }
}

function editWorker() {
  console.log(chalk.blue('\n✏️  Opening worker code in nano...\n'));
  
  try {
    execSync('nano src/index.js', {
      cwd: WORKER_DIR,
      stdio: 'inherit'
    });
  } catch (error) {
    // User likely exited nano
  }
}

function startDevServer() {
  console.log(chalk.blue('\n🚀 Starting local development server (Ctrl+C to stop)...\n'));
  
  try {
    execSync('wrangler dev', {
      cwd: WORKER_DIR,
      stdio: 'inherit',
      env: { ...process.env, CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN }
    });
  } catch (error) {
    // User likely pressed Ctrl+C
  }
}

function viewDeploymentUrl() {
  console.log(chalk.blue('\n🌐 Deployment Information:\n'));
  
  const configPath = join(WORKER_DIR, 'wrangler.toml');
  if (existsSync(configPath)) {
    const config = readFileSync(configPath, 'utf8');
    const nameMatch = config.match(/name\s*=\s*"([^"]+)"/);
    if (nameMatch) {
      const workerName = nameMatch[1];
      console.log(chalk.green(`Worker Name: ${workerName}`));
      console.log(chalk.green(`\nPossible URLs:`));
      console.log(chalk.cyan(`  https://${workerName}.<your-subdomain>.workers.dev`));
      console.log(chalk.gray('\n  Note: Replace <your-subdomain> with your Cloudflare account subdomain'));
      console.log(chalk.gray('  The exact URL will be shown after deployment'));
    }
  }
}

async function main() {
  let running = true;
  
  while (running) {
    showMenu();
    
    const readline = await import('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const choice = await new Promise((resolve) => {
      rl.question(chalk.cyan('Select an option: '), (answer) => {
        rl.close();
        resolve(answer);
      });
    });
    
    switch (choice) {
      case '1':
        deployWorker();
        await new Promise(resolve => setTimeout(resolve, 3000));
        break;
      case '2':
        viewLogs();
        break;
      case '3':
        workerStatus();
        await new Promise(resolve => setTimeout(resolve, 5000));
        break;
      case '4':
        editWorker();
        break;
      case '5':
        startDevServer();
        break;
      case '6':
        viewDeploymentUrl();
        await new Promise(resolve => setTimeout(resolve, 5000));
        break;
      case '0':
        running = false;
        console.log(chalk.green('\nGoodbye! 👋\n'));
        break;
      default:
        console.log(chalk.red('\nInvalid option. Please try again.'));
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}

main().catch(console.error);