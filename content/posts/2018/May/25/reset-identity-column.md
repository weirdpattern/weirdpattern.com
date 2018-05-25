---
title: "Reset an identity column of a table in SQL Server"
style: "snippet"
abstract: "Learn how to reset an identity column to a specific value in SQL Server."
cover: "/images/database.jpg"
date: "2018-05-25"
author: "Patricio Treviño"
category: "database"
tags:
    - database
    - sql
    - sql server
    - index
    - identity
    - table
    - column
---

<!-- start:abstract -->

## Syntax

```
DBCC CHECKIDENT (<table>, RESEED, <value>)
```

| Option    | Description                        |
| --------- | ---------------------------------- |
| **table** | The name of the table to be reset. |
| **value** | The new value to be used.          |

<!-- end:abstract -->

## Example

```sql
-- resets the identity column (PK) in the Employee table to 1
DBCC CHECKIDENT ('Employee', RESEED, 1)
```
