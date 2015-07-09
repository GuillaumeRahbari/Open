package com.opengroup.androidopeneat;

import android.os.AsyncTask;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by Guillaume on 09/07/15.
 */
public class ServiceHTTP extends AsyncTask<Void, Void, String> {

    /**
     * Permet de faire une requête au serveur de manière asynchrone.
     * @param params
     * @return
     */
    @Override
    protected String doInBackground(Void... params) {
        URL url = null;
        try {
            url = new URL("http://10.0.2.2:3000/");
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            InputStream in = new BufferedInputStream(urlConnection.getInputStream());
            BufferedReader streamReader = new BufferedReader(new InputStreamReader(in, "UTF-8"));
            StringBuilder responseStrBuilder = new StringBuilder();
            String inputStr;

            while ((inputStr = streamReader.readLine()) != null){
                responseStrBuilder.append(inputStr);
            }
            String json = responseStrBuilder.toString();
            return json;
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
