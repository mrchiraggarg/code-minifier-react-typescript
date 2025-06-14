import { minify as terserMinify } from 'terser';
import CleanCSS from 'clean-css';
import { minify as htmlMinify } from 'html-minifier-terser';

type Language = 'javascript' | 'css' | 'html';

export async function minifyCode(code: string, language: Language): Promise<string> {
  if (!code.trim()) {
    return '';
  }

  try {
    switch (language) {
      case 'javascript':
        const jsResult = await terserMinify(code, {
          compress: {
            dead_code: true,
            drop_console: false,
            drop_debugger: true,
            pure_funcs: [],
          },
          mangle: {
            toplevel: false,
          },
          format: {
            comments: false,
          },
        });
        
        if (!jsResult.code) {
          throw new Error('Failed to minify JavaScript code');
        }
        
        return jsResult.code;

      case 'css':
        const cleanCSS = new CleanCSS({
          level: {
            1: {
              all: true,
            },
            2: {
              all: true,
            },
          },
        });
        
        const cssResult = cleanCSS.minify(code);
        
        if (cssResult.errors && cssResult.errors.length > 0) {
          throw new Error(`CSS minification error: ${cssResult.errors[0]}`);
        }
        
        return cssResult.styles;

      case 'html':
        const htmlResult = await htmlMinify(code, {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          minifyCSS: true,
          minifyJS: true,
        });
        
        return htmlResult;

      default:
        throw new Error(`Unsupported language: ${language}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Minification failed: ${error.message}`);
    }
    throw new Error('Minification failed with unknown error');
  }
}