const { spawn } = require('child_process');

const server = spawn('npx', ['http-server', 'storybook-static'], {
  stdio: 'pipe',
});

server.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

server.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

server.stdout.on('data', (data) => {
  if (data.toString().includes('Available on')) {
    console.log('サーバーが起動しました。Playwrightのテストを実行します...');

    const test = spawn('npx', ['playwright', 'test', 'tests/snapshots.spec.ts'], {
      stdio: 'inherit',
    });

    // Playwrightのテストが完了したらサーバーを終了
    test.on('close', (code) => {
      console.log(`Playwrightのテストが終了しました。サーバーを終了します（コード: ${code}）`);
      server.kill();
    });
  }
});
// サーバーが予期せず終了した場合のハンドリング
server.on('close', (code) => {
  console.log(`サーバーが終了しました（コード: ${code}）`);
});
