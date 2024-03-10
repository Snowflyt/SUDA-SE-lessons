enum TokenType {
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
  LPAREN = 'LPAREN',
  RPAREN = 'RPAREN',
  TERM = 'TERM',
  EOF = 'EOF',
}

interface Token {
  type: TokenType;
  value: string;
}

/**
 * Tokenize the input string into an array of tokens.
 * @param input The input string to tokenize.
 * @returns An array of tokens.
 */
export const lexer = (input: string): Token[] => {
  const tokens: Token[] = [];
  let currentPosition = 0;

  while (currentPosition < input.length) {
    const char = input[currentPosition];

    if (/\s/.test(char)) {
      currentPosition++;
      continue;
    }

    if (char === '(') {
      tokens.push({ type: TokenType.LPAREN, value: char });
      currentPosition++;
      continue;
    }

    if (char === ')') {
      tokens.push({ type: TokenType.RPAREN, value: char });
      currentPosition++;
      continue;
    }

    const wordMatch = input.slice(currentPosition).match(/^\w+/);
    if (wordMatch) {
      const word = wordMatch[0].toLowerCase();
      currentPosition += word.length;

      switch (word) {
        case 'and':
          tokens.push({ type: TokenType.AND, value: word });
          break;
        case 'or':
          tokens.push({ type: TokenType.OR, value: word });
          break;
        case 'not':
          tokens.push({ type: TokenType.NOT, value: word });
          break;
        default:
          tokens.push({ type: TokenType.TERM, value: word });
      }
      continue;
    }

    throw new Error(`Unexpected character: ${char}`);
  }

  tokens.push({ type: TokenType.EOF, value: '' });
  return tokens;
};

export type ASTNode = TermNode | AndNode | OrNode | NotNode;

interface TermNode {
  type: 'Term';
  value: string;
}

interface AndNode {
  type: 'And';
  left: ASTNode;
  right: ASTNode;
}

interface OrNode {
  type: 'Or';
  left: ASTNode;
  right: ASTNode;
}

interface NotNode {
  type: 'Not';
  operand: ASTNode;
}

/**
 * Parse the tokens into an AST.
 * @param tokens The tokens to parse.
 * @returns
 */
export const parser = (tokens: Token[]): ASTNode => {
  let currentTokenIndex = 0;

  const getNextToken = (): Token => tokens[currentTokenIndex++];

  const parseTerm = (token: Token): TermNode => ({
    type: 'Term',
    value: token.value,
  });

  const parseNot = (operand: ASTNode): NotNode => ({
    type: 'Not',
    operand,
  });

  const parseExpression = (): ASTNode => {
    let left = parseFactor();

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const token = getNextToken();

      if (token.type === TokenType.AND) {
        left = { type: 'And', left, right: parseFactor() };
      } else if (token.type === TokenType.OR) {
        left = { type: 'Or', left, right: parseFactor() };
      } else {
        currentTokenIndex--;
        break;
      }
    }

    return left;
  };

  const parseFactor = (): ASTNode => {
    let token = getNextToken();
    if (token.type === TokenType.LPAREN) {
      const expr = parseExpression();
      token = getNextToken();

      if (token.type !== TokenType.RPAREN) {
        throw new Error('Expected a closing parenthesis');
      }

      return expr;
    }

    if (token.type === TokenType.NOT) {
      const operand = parseFactor();
      return parseNot(operand);
    }

    if (token.type === TokenType.TERM) {
      return parseTerm(token);
    }

    throw new Error(`Unexpected token: ${token.type}`);
  };

  const ast = parseExpression();
  const eofToken = getNextToken();

  if (eofToken.type !== TokenType.EOF) {
    throw new Error('Expected end of input');
  }

  return ast;
};
