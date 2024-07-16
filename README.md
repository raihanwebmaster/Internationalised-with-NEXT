
# Internationalised-with-NEXT

A project demonstrating how to use Next.js with next-i18next for internationalization.

## Features

- Internationalization with next-i18next.
- Language switching.
- Server-side rendering with localization.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/raihanwebmaster/Internationalised-with-NEXT.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Internationalised-with-NEXT
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the development server:
    ```bash
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:3000`.


## Internationalization with next-i18next

This project uses [next-i18next](https://github.com/isaachinman/next-i18next) for internationalization. Below are some examples and configurations to help you get started.

### Configuration

The i18n configuration is defined in `next-i18next.config.js`:

```js
const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'de'],
  },
  localePath: path.resolve('./public/locales'),
};
```

### Usage in Pages

To use the translation functionality in a Next.js page, you can use the `useTranslation` hook provided by next-i18next:

```js
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <div>
      <h1>{t('welcome')}</h1>
    </div>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
```

### Adding Translations

Translations are stored in JSON files under the `public/locales` directory. For example, to add translations for English and French:

- `public/locales/en/common.json`:
    ```json
    {
      "welcome": "Welcome to our application"
    }
    ```

- `public/locales/fr/common.json`:
    ```json
    {
      "welcome": "Bienvenue dans notre application"
    }
    ```

### Language Switching

To implement language switching, you can use the `Link` component from `next/link` along with the `useRouter` hook from `next/router`:

```js
import Link from 'next/link';
import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;

  return (
    <div>
      {locales.map((loc) => (
        <span key={loc}>
          <Link href={router.asPath} locale={loc}>
            <a style={{ margin: 10, textDecoration: locale === loc ? 'underline' : 'none' }}>
              {loc}
            </a>
          </Link>
        </span>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Contact

For any inquiries, please reach out to the repository owner.
