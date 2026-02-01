import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import { builtinModules } from 'module';

export default defineConfig([
    {
        input: "src/index.js",
        output: [
            {
                dir: 'dist',
                format: 'es',
                entryFileNames: 'index.min.js',
                exports: "named"
            },
            {
                dir: 'dist',
                format: 'cjs',
                entryFileNames: 'index.min.cjs',
                exports: "named"
            }
        ],
        external: [
            ...builtinModules,
            ...builtinModules.map(m => `node:${m}`),
            '@socket.io/component-emitter'
        ],
        plugins: [
            nodeResolve({ preferBuiltins: true, browser: false }),
            commonjs(),
            replace({ 
                preventAssignment: true, 
                'process.env.NODE_ENV': JSON.stringify('production') 
            }),
            terser()
        ]
    },
        {
        input: "src/index.js",
        output: [
            {
                dir: 'dist',
                format: 'umd',
                name: 'SocketIOCompactParser',
                entryFileNames: 'browser.min.js',
                exports: "named"
            }
        ],
        plugins: [
            nodeResolve({ browser: true }),
            commonjs(),
            replace({ 
                preventAssignment: true, 
                'process.env.NODE_ENV': JSON.stringify('production') 
            }),
            terser()
        ]
    }
]);
