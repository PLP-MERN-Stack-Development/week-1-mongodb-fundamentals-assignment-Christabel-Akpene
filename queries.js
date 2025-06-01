// Task 2

// Connecting to plp_bookstore
// use bookstore

// Find all books in a Adventure genre
db.books.find({genre: "Adventure"})

// Find books published after the year 1957
db.books.find({published_year: {$gt: 1957}})

// Find books by a specific author
db.books.find({author: "Aldous Huxley"})

// Update the price of a certain book
db.books.updateOne({title: "To Kill a Mockingbird"}, {$set:{price: 15.50} })

// Delete book by its title
db.books.deleteOne({title: "To Kill a Mockingbird"})


// Task 3

// Books both in stock and published after 2010.
db.books.find({in_stock: true, published_year: {$gt: 2010}})


// Using projection to return only title, author and price fields
db.books.find({}, {title: 1, author: 1, price: 1 })

// Sorting to display books by price in ascending order
db.books.find({}).sort({price: 1})

// Sorting to display books by price in descending order
db.books.find({}).sort({price: -1})

// Pagination with five books per page.
db.books.find({}).skip(0).limit(5)
db.books.find({}).skip(5).limit(5)
db.books.find({}).skip(10).limit(5)


// Aggregation Pipeline

// Average price of books per genre
db.books.aggregate([
    {$group: {_id: "$genre", averagePrice: {$avg: "$price"}}}
])

// Author with most books in collection
db.books.aggregate([
   {$group: {_id: "$author", count: {$sum: 1}}}, 
   {$sort: {count: -1}},
   {$limit: 1}
])

// Groups by decade and counts them
db.books.aggregate([
    {$project: {decade: {$multiply:[{$floor: {$divide: ["$published_year", 10]}}, 10]}}},
    {$group: {_id: "$decade", count: {$sum: 1}}},
    {$sort: {_id: 1}}
])



// Indexing 

// Index on title field
db.books.createIndex({title: 1})

// Compound index on the author & published_year
db.books.createIndex({author: 1, published_year: 1})


// Explain method
 db.books.find({title: "Animal Farm"}).explain("executionStats")
 // total keys examined was 1 instead of the total number of books