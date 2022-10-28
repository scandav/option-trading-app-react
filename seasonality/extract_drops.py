import csv
from datetime import datetime 

def is_third_friday(s):
    d = datetime.strptime(s, '%b %d, %Y')
    return d.weekday() == 4 and 15 <= d.day <= 21

def getGreatestDrop(stock):
    """Calculates the greatest relative drop of a stock.
    @param stock: 1-D list contianing the values of that stock
    Returns a tuple with the relative drop size, the index of the start and the
    index of the end of that drop.
    """

    min = None # The smallest absolute value seen so far
    minIndex = None  # The index of the smallest absolute value smallest value
    greatestDrop = None # The biggest relative drop seen so far
    greatestDropStart = None # The index of the drop start
    greatestDropEnd = None # The index of the drop end

    # Iterating backwards through the array, starting from the last element
    for index in range(len(stock)-1,-1,-1):
        # Update min
        if min is None or stock[index] < min:
            min = stock[index]
            minIndex = index

        # Calculate relative drop
        drop = 1-min/stock[index]

        # Update greatest drop
        if greatestDrop is None or drop > greatestDrop:
            greatestDrop = drop
            greatestDropStart = index
            greatestDropEnd = minIndex

    # Return values
    return greatestDrop, greatestDropStart, greatestDropEnd

stock_list = {}

with open('seasonality/SnP500_history.csv') as csvfile:
    stock_reader = csv.reader(csvfile)
    month_list_open = []
    month_list_high = []
    month_list_low = []
    month_list_close = []

    for row in reversed(list(stock_reader)[1:]):
        month_list_open.append(float(row[1]))
        month_list_high.append(float(row[2]))
        month_list_low.append(float(row[3]))
        month_list_close.append(float(row[4]))

        if is_third_friday(row[0]):
            dt = datetime.strptime(row[0], '%b %d, %Y')
            stock_list[f'{dt.year}_{dt.month}'] = {'open': month_list_open, 'high': month_list_high,
                                                   'low': month_list_low, 'close': month_list_close}
            month_list_open.clear()
            month_list_high.clear()
            month_list_low.clear()
            month_list_close.clear()

print('ciao')