import pandas as pd
import numpy as np

df = pd.read_csv('seasonality/SnP500_history.csv')
df.Date = pd.to_datetime(df.Date)
df = df.sort_values('Date').reset_index(drop=True)

minim = df.groupby([df.Date.dt.year, df.Date.dt.month]).Low.min()
maxim = df.groupby([df.Date.dt.year, df.Date.dt.month]).High.max()

idxminim = df.groupby([df.Date.dt.year, df.Date.dt.month]).Low.idxmin()
idxmaxim = df.groupby([df.Date.dt.year, df.Date.dt.month]).High.idxmax()
factor = np.sign(idxmaxim - idxminim)
delta = round((maxim - minim) / maxim * 100 * factor, 2)

delta = delta.unstack(level=-1)
delta.index = delta.index.set_names(['id'])
delta = delta.reset_index().sort_values(by='id', ascending=False)
avg = pd.DataFrame([['Average'] + round(delta.mean(axis=0), 2).to_list()[1:]], columns=delta.columns)
maxx = pd.DataFrame([['Maximum'] + round(delta.max(axis=0), 2).to_list()[1:]], columns=delta.columns)
minn = pd.DataFrame([['Minimum'] + round(delta.min(axis=0), 2).to_list()[1:]], columns=delta.columns)
delta = pd.concat([maxx, avg, minn, delta])
delta.to_json('src/data/SnP500_seasonality.json', orient='records')