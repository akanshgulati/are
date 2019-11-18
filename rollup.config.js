import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
	// browser-friendly UMD build
	{
		input: 'src/index.js',
		output: {
			name: 'are',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			babel({
				exclude: ['node_modules/**']
			}),
			resolve(), // so Rollup can find `ms`
			commonjs(), // so Rollup can convert `ms` to an ES module
			(process.env.NODE_ENV === 'production' && terser({
				output: {
					comments: false
				},
				compress: true,
				mangle: true
			}))
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'src/index.js',
		external: ['ms'],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		],
		plugins: [
			babel({
				exclude: ['node_modules/**'],
			}),
			(process.env.NODE_ENV === 'production' && terser({
				output: {
					comments: false
				},
				compress: true,
				mangle: true
			}))
		]
	}
];
