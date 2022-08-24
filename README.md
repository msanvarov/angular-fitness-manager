# Concepts

## Firebase Configuration

Firebase is configured via `firebase-tools` CLI.

To download the latest version of the Firebase CLI:

```bash
$ npm install -g firebase-tools
# login to firebase
$ firebase login
```

To configure the project:

```bash
$ firebase init
```

Preferred configurations to Firebase files:

**database.rules.json**

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "schedule": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid",
        ".indexOn": ["timestamp"]
      }
    },
    "meals": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "workouts": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

**firebase.json**

```json
{
  "hosting": {
    "public": "dist/apps/fitness",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "database": {
    "rules": "database.rules.json"
  }
}
```

## Testing Configuration

Build the application as it as and push it to the Firebase hosting.

```bash
npm run build
# OR
yarn build
```

> Remark: Must be logged on to Firebase. As mentioned before, this can be done via `firebase login`

To deploy to Firebase hosting (after executing build task):

```bash
$ firebase deploy --only hosting
```
