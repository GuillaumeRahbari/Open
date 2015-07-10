package com.opengroup.androidopeneat;

import android.app.Activity;
import android.os.Bundle;
import android.support.wearable.view.WatchViewStub;
import android.widget.TextView;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.wearable.MessageApi;
import com.google.android.gms.wearable.MessageEvent;
import com.google.android.gms.wearable.Node;
import com.google.android.gms.wearable.NodeApi;
import com.google.android.gms.wearable.Wearable;

public class MainWear extends Activity implements GoogleApiClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener, MessageApi.MessageListener{

    private TextView mTextView;

    protected GoogleApiClient mApiClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_wear);
        final WatchViewStub stub = (WatchViewStub) findViewById(R.id.watch_view_stub);
        stub.setOnLayoutInflatedListener(new WatchViewStub.OnLayoutInflatedListener() {
            @Override
            public void onLayoutInflated(WatchViewStub stub) {
                mTextView = (TextView) stub.findViewById(R.id.text);
            }
        });
    }

    /**
     * A l'ouverture, connecte la montre au Google API Client / donc au smartphone
     */
    @Override
    protected void onStart() {
        super.onStart();
        mApiClient = new GoogleApiClient.Builder(this)
                .addApi(Wearable.API)
                .addConnectionCallbacks(this)
                .addOnConnectionFailedListener(this)
                .build();

        mApiClient.connect();
    }

    /**
     * A la fermeture de l'application, desactive le GoogleApiClient
     * Et ferme l'envoie de message
     */
    @Override
    protected void onStop() {
        if (null != mApiClient && mApiClient.isConnected()) {
            Wearable.MessageApi.removeListener(mApiClient, this);
            mApiClient.disconnect();
        }
        super.onStop();
    }

    /**
     * Si nous avons une connection aux Google API, donc au smartphone
     * Nous autorisons l'envoie de messages
     */
    @Override
    public void onConnected(Bundle bundle) {
        Wearable.MessageApi.addListener(mApiClient, this);

        //envoie le premier message
        sendMessage("bonjour", "smartphone");
    }

    @Override
    public void onConnectionSuspended(int i) {

    }

    @Override
    public void onConnectionFailed(ConnectionResult connectionResult) {

    }

    /**
     * Appellé à la réception d'un message envoyé depuis le smartphone
     * @param messageEvent message reçu
     */
    @Override
    public void onMessageReceived(MessageEvent messageEvent) {
        //traite le message reçu
        final String path = messageEvent.getPath();

        if(path.equals("bonjour")){

            //récupère le contenu du message
            final String message = new String(messageEvent.getData());

            //penser à effectuer les actions graphiques dans le UIThread
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    
                }
            });
        }
    }

    /**
     * Envoie un message à au smartphone
     * @param path identifiant du message
     * @param message message à transmettre
     */
    protected void sendMessage(final String path, final String message) {
        //effectué dans un trhead afin de ne pas être bloquant
        new Thread(new Runnable() {
            @Override
            public void run() {
                //envoie le message à tous les noeuds/montres connectées
                final NodeApi.GetConnectedNodesResult nodes = Wearable.NodeApi.getConnectedNodes(mApiClient).await();
                for (Node node : nodes.getNodes()) {
                    Wearable.MessageApi.sendMessage(mApiClient, node.getId(), path, message.getBytes()).await();

                }
            }
        }).start();
    }
}
