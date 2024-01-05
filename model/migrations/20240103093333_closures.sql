-- migrate:up
CREATE TABLE IF NOT EXISTS closures (
  id TEXT NOT NULL PRIMARY KEY,
  register TEXT NOT NULL,
  staff TEXT NOT NULL,
  dateFrom NOT NULL,
  dateTo NOT NULL,
  sales INTEGER NOT NULL,
  total REAL NOT NULL,
  /* status enum can be 'not-posted', 'manual', 'posted' */
  status TEXT DEFAULT "not-posted" NOT NULL,
  datePostedToSage,
  postedToSageBy,
  sageId
) WITHOUT ROWID;

CREATE TABLE IF NOT EXISTS payments (
  closureId NOT NULL,
  method TEXT NOT NULL,
  expected REAL NOT NULL,
  counted REAL NOT NULL,
  variance REAL NOT NULL,
  FOREIGN KEY (closureId)
    REFERENCES closures (id) 
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS categories (
  closureId NOT NULL,
  category TEXT NOT NULL, /* enum WET, DRY, FOOD, ALCOHOL, DRINK, TEA_COFFEE, SNACKS, MISC, DELETED */
  quantity INTEGER NOT NULL,
  grossSales REAL NOT NULL,
  discounts REAL NOT NULL,
  totalSales REAL NOT NULL,
  vat REAL NOT NULL,
  netSales REAL NOT NULL,
  FOREIGN KEY (closureId)
    REFERENCES closures (id) 
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- migrate:down
drop table if exists closures;
drop table if exists payments;
drop table if exists categories;
