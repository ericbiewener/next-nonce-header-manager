import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { NONCE } from './constants'

class NextDocument extends Document {
  render() {
    return (
      <Html>
        <Head nonce={NONCE} />
        <body>
          <Main />
          <NextScript nonce={NONCE} />
        </body>
      </Html>
    );
  }
}

export default NextDocument
