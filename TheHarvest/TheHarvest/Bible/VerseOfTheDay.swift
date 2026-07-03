import Foundation

/// A curated year of Jesus-centered verses — His words, His love, His plan.
/// The day of the year picks the verse, so everyone sees the same verse together.
enum VerseOfTheDay {
    private static let references: [String] = [
        "John 3:16", "John 15:5", "John 14:6", "Matthew 11:28", "John 10:10",
        "John 8:12", "John 15:4", "Matthew 6:33", "John 13:34", "John 16:33",
        "Matthew 5:14", "John 15:9", "John 15:11", "Matthew 28:20", "John 14:27",
        "John 11:25", "Matthew 7:7", "John 6:35", "John 7:38", "Matthew 22:37",
        "Romans 8:38", "Romans 5:8", "Romans 8:28", "Romans 10:9", "Romans 12:2",
        "Philippians 4:13", "Philippians 4:6", "Philippians 4:7", "Philippians 1:6",
        "Ephesians 2:8", "Ephesians 3:20", "Galatians 2:20", "Galatians 5:22",
        "2 Corinthians 5:17", "1 Corinthians 13:4", "1 Corinthians 13:13",
        "Colossians 3:23", "Colossians 3:15", "Hebrews 11:1", "Hebrews 12:2",
        "Hebrews 13:8", "James 1:5", "1 Peter 5:7", "1 John 4:19", "1 John 4:8",
        "1 John 1:9", "Isaiah 40:31", "Isaiah 41:10", "Isaiah 53:5", "Jeremiah 29:11",
        "Psalms 23:1", "Psalms 46:10", "Psalms 34:18", "Psalms 119:105", "Psalms 27:1",
        "Psalms 37:4", "Proverbs 3:5", "Proverbs 3:6", "Joshua 1:9", "Zephaniah 3:17",
        "Lamentations 3:22", "Micah 6:8", "Matthew 9:37", "Luke 10:2", "John 4:35",
        "Acts 1:8", "Romans 15:13", "2 Timothy 1:7", "Revelation 3:20", "John 1:5"
    ]

    static func reference(for date: Date = Date()) -> VerseRef {
        let day = Calendar.current.ordinality(of: .day, in: .year, for: date) ?? 1
        let raw = references[(day - 1) % references.count]
        return BibleStore.parseReference(raw)
            ?? VerseRef(bookIndex: 42, chapter: 3, verse: 16)
    }
}
