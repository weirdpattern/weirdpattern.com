---
title: "Reset an identity column of a table in SQL Server"
style: "snippet"
image: "../../../images/database.jpeg"
abstract: "Learn how to reset an identity column to a specific value in SQL Server."
date: "2018-05-25"
author: "ptrevino"
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

<div class="tldr" markdown="true">

  I use this to clean up my tables after completing development of a data-load script.  

  The reason... I keep deleting data from the table and re-running the script over and over again, and 
  of course, the identity keeps getting bigger and bigger. At the end, the id of the first entry in the 
  table has some ridiculous number and honestly...  

  I just can't have it.

  Enjoy!

</div>

<!-- start:abstract -->

### Syntax

```
DBCC CHECKIDENT (<table>, RESEED, <value>)
```

| Option    | Description                        |
| --------- | ---------------------------------- |
| **table** | The name of the table to be reset. |
| **value** | The new value to be used.          |

<!-- end:abstract -->  

### Example

```sql
DBCC CHECKIDENT ('Employee', RESEED, 1)
```

### References
[DBCC CHECKIDENT &#40;Transact-SQL&#41;](https://docs.microsoft.com/en-us/sql/t-sql/database-console-commands/dbcc-checkident-transact-sql?view=sql-server-2017) 
